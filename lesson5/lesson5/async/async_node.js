// // Для профессионалов HARD
// // Цикл событий Node.js, таймеры и process.nextTick()
// // Что такое цикл событий?
// // Цикл событий — это то, что позволяет Node.js выполнять неблокирующие операции ввода-вывода — несмотря на то, что JavaScript является однопоточным — путем разгрузки операций на системное ядро, когда это возможно.

// // Поскольку большинство современных ядер являются многопоточными, они могут обрабатывать несколько операций, выполняемых в фоновом режиме. Когда одна из этих операций завершается, ядро ​​сообщает Node.js, чтобы соответствующий обратный вызов мог быть добавлен в очередь опроса для последующего выполнения. Мы объясним это более подробно позже в этом разделе.

// // Объяснение цикла событий
// // Когда Node.js запускается, он инициализирует цикл событий, обрабатывает предоставленный входной скрипт (или переходит в REPL , который не рассматривается в этом документе), который может выполнять асинхронные вызовы API, планировать таймеры или вызывать process.nextTick(), а затем начинает обработку события. петля.

// // На следующей диаграмме показан упрощенный обзор порядка операций цикла событий.

// //    ┌───────────────────────────┐
// // ┌─>│           timers          │
// // │  └─────────────┬─────────────┘
// // │  ┌─────────────┴─────────────┐
// // │  │     pending callbacks     │
// // │  └─────────────┬─────────────┘
// // │  ┌─────────────┴─────────────┐
// // │  │       idle, prepare       │
// // │  └─────────────┬─────────────┘      ┌───────────────┐
// // │  ┌─────────────┴─────────────┐      │   incoming:   │
// // │  │           poll            │<─────┤  connections, │
// // │  └─────────────┬─────────────┘      │   data, etc.  │
// // │  ┌─────────────┴─────────────┐      └───────────────┘
// // │  │           check           │
// // │  └─────────────┬─────────────┘
// // │  ┌─────────────┴─────────────┐
// // └──┤      close callbacks      │
// //    └───────────────────────────┘
// // Каждое поле будет называться «фазой» цикла событий.

// // Каждая фаза имеет очередь FIFO обратных вызовов для выполнения. Хотя каждая фаза особенная по-своему, как правило, когда цикл событий входит в данную фазу, он будет выполнять любые операции, характерные для этой фазы, а затем выполнять обратные вызовы в очереди этой фазы до тех пор, пока очередь не будет исчерпана или максимальное количество обратных вызовов выполнил. Когда очередь будет исчерпана или достигнут предел обратного вызова, цикл событий перейдет к следующей фазе и так далее.

// // Поскольку любая из этих операций может планировать дополнительные операции, а новые события, обрабатываемые на этапе опроса , ставятся ядром в очередь, события опроса могут ставиться в очередь во время обработки событий опроса. В результате длительные обратные вызовы могут позволить фазе опроса работать намного дольше, чем пороговое значение таймера. См. разделы таймеров и опросов для более подробной информации.

// // Есть небольшое расхождение между реализацией Windows и Unix/Linux, но это не важно для этой демонстрации. Самые важные части здесь. На самом деле шагов семь или восемь, но нас интересуют те, которые на самом деле использует Node.js, — это те, что указаны выше.

// // Обзор фаз
// // timers : на этом этапе выполняются обратные вызовы, запланированные setTimeout() и setInterval().
// // pending callbacks : выполняет обратные вызовы ввода-вывода, отложенные до следующей итерации цикла.
// // бездействие, подготовка : используется только для внутреннего использования.
// // poll : получить новые события ввода/вывода; выполнять обратные вызовы, связанные с вводом-выводом (почти все, за исключением обратных вызовов закрытия, тех, которые запланированы таймерами и т. д. setImmediate()); node будет блокироваться здесь, когда это уместно.
// // check : setImmediate()здесь вызываются обратные вызовы.
// // обратные вызовы закрытия : некоторые обратные вызовы закрытия, например socket.on('close', ...).
// // Между каждым запуском цикла событий Node.js проверяет, ожидает ли он каких-либо асинхронных операций ввода-вывода или таймеров, и корректно завершает работу, если таковых нет.

// // Этапы в деталях
// // таймеры
// // Таймер указывает порог , после которого может быть выполнен предоставленный обратный вызов , а не точное время, когда человек хочет, чтобы он был выполнен . Обратные вызовы таймеров будут запускаться, как только они могут быть запланированы после того, как пройдет указанное количество времени; однако планирование операционной системы или выполнение других обратных вызовов могут задержать их.

// // Технически фаза опроса контролирует, когда выполняются таймеры.

// // Например, предположим, что вы запланировали тайм-аут для выполнения после порога в 100 мс, тогда ваш скрипт начнет асинхронно читать файл, который занимает 95 мс:

// const fs = require('fs');

// function someAsyncOperation(callback) {
//   // Assume this takes 95ms to complete
//   fs.readFile('/path/to/file', callback);
// }

// const timeoutScheduled = Date.now();

// setTimeout(() => {
//   const delay = Date.now() - timeoutScheduled;

//   console.log(`${delay}ms have passed since I was scheduled`);
// }, 100);

// // do someAsyncOperation which takes 95 ms to complete
// someAsyncOperation(() => {
//   const startCallback = Date.now();

//   // do something that will take 10ms...
//   while (Date.now() - startCallback < 10) {
//     // do nothing
//   }
// });
// // Когда цикл событий входит в фазу опроса , он имеет пустую очередь ( fs.readFile()не завершена ), поэтому он будет ждать оставшееся количество мс, пока не будет достигнут порог ближайшего таймера. Пока он ожидает прохождения 95 мс, fs.readFile()заканчивает чтение файла, и его обратный вызов, который занимает 10 мс, добавляется в очередь опроса и выполняется. Когда обратный вызов завершается, в очереди больше нет обратных вызовов, поэтому цикл событий увидит, что порог ближайшего таймера был достигнут, а затем вернется к фазе таймеров для выполнения обратного вызова таймера. В этом примере вы увидите, что общая задержка между запланированным таймером и выполнением его обратного вызова будет составлять 105 мс.

// // Чтобы фаза опроса не приводила к голоданию цикла событий, libuv (библиотека C, которая реализует цикл событий Node.js и все асинхронные поведения платформы) также имеет жесткий максимум (зависит от системы), прежде чем она остановит опрос для большего количества событий. .

// // ожидающие обратные вызовы
// // На этом этапе выполняются обратные вызовы для некоторых системных операций, таких как типы ошибок TCP. Например, если сокет TCP получает ECONNREFUSEDпри попытке подключения, некоторые системы *nix хотят подождать, чтобы сообщить об ошибке. Это будет поставлено в очередь для выполнения на этапе ожидающих обратных вызовов .

// // опрос
// // Этап опроса выполняет две основные функции:

// // Вычисляя, как долго он должен блокировать и опрашивать ввод-вывод, затем
// // Обработка событий в очереди опроса .
// // Когда цикл обработки событий переходит в фазу опроса , а таймеры не запланированы , произойдет одно из двух:

// // Если очередь опроса не пуста , цикл событий будет перебирать свою очередь обратных вызовов, выполняя их синхронно до тех пор, пока либо очередь не будет исчерпана, либо не будет достигнут жесткий предел, зависящий от системы.

// // Если очередь опроса пуста , произойдет еще одно из двух событий:

// // Если сценарии были запланированы пользователем setImmediate(), цикл обработки событий завершит фазу опроса и перейдет к фазе проверки для выполнения этих запланированных сценариев.

// // Если сценарии не были запланированы пользователем setImmediate(), цикл обработки событий будет ожидать добавления обратных вызовов в очередь, а затем немедленно их выполнять.

// // Как только очередь опроса опустеет, цикл обработки событий проверит наличие таймеров , пороговые значения времени которых были достигнуты . Если один или несколько таймеров готовы, цикл событий вернется к фазе таймеров для выполнения обратных вызовов этих таймеров.

// // Проверьте
// // Эта фаза позволяет человеку выполнять обратные вызовы сразу после завершения фазы опроса . Если фаза опроса становится бездействующей, а сценарии поставлены в очередь с setImmediate()помощью , цикл обработки событий может перейти к фазе проверки , а не к ожиданию.

// // setImmediate()на самом деле это специальный таймер, который запускается в отдельной фазе цикла событий. Он использует API-интерфейс libuv, который планирует выполнение обратных вызовов после завершения фазы опроса .

// // Как правило, по мере выполнения кода цикл событий в конечном итоге достигает фазы опроса, где он будет ожидать входящего соединения, запроса и т. д. Однако, если обратный вызов был запланирован с помощью setImmediate() и фаза опроса становится бездействующей, она завершается и перейти к фазе проверки , а не ждать событий опроса .

// // закрыть обратные вызовы
// // Если сокет или дескриптор внезапно закрываются (например socket.destroy(), ), 'close'событие будет сгенерировано на этой фазе. В противном случае он будет отправлен через process.nextTick().

// // setImmediate()противsetTimeout()
// // setImmediate()и setTimeout()похожи, но ведут себя по-разному в зависимости от того, когда они вызываются.

// // setImmediate()предназначен для выполнения скрипта после завершения текущей фазы опроса .
// // setTimeout()планирует запуск сценария после истечения минимального порога в мс.
// // Порядок, в котором выполняются таймеры, зависит от контекста, в котором они вызываются. Если оба вызываются из основного модуля, то время будет зависеть от производительности процесса (на которую могут влиять другие приложения, работающие на машине).

// // Например, если мы запускаем следующий сценарий, который не находится в цикле ввода-вывода (т. е. в основном модуле), порядок, в котором выполняются два таймера, недетерминирован, поскольку он связан с производительностью процесса:

// // // timeout_vs_immediate.js
// // setTimeout(() => {
// //   console.log('timeout');
// // }, 0);

// // setImmediate(() => {
// //   console.log('immediate');
// // });
// // $ node timeout_vs_immediate.js
// // timeout
// // immediate

// // $ node timeout_vs_immediate.js
// // immediate
// // timeout
// // Однако, если вы перемещаете два вызова в пределах цикла ввода-вывода, немедленный обратный вызов всегда выполняется первым:

// // timeout_vs_immediate.js
// const fs = require('fs');

// fs.readFile(__filename, () => {
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate');
//   });
// });

// // $ node timeout_vs_immediate.js
// // immediate
// // timeout

// // $ node timeout_vs_immediate.js
// // immediate
// // timeout
// // Основное преимущество использования setImmediate()over setTimeout()всегда setImmediate()будет выполняться перед любыми таймерами, если они запланированы в цикле ввода-вывода, независимо от того, сколько таймеров присутствует.

// // process.nextTick()
// // Пониманиеprocess.nextTick()
// // Возможно, вы заметили, что process.nextTick()это не отображается на диаграмме, несмотря на то, что это часть асинхронного API. Это связано с тем , что process.nextTick()технически это не является частью цикла событий. Вместо этого nextTickQueueбудет обработано после завершения текущей операции, независимо от текущей фазы цикла событий. Здесь операция определяется как переход от базового обработчика C/C++ и обработка JavaScript, который необходимо выполнить.

// // Оглядываясь назад на нашу диаграмму, каждый раз, когда вы звоните process.nextTick()в данной фазе, все переданные обратные вызовы process.nextTick()будут разрешены до того, как цикл обработки событий продолжится. Это может создать некоторые плохие ситуации, потому что позволяет вам «морить голодом» ваш ввод-вывод, делая рекурсивные process.nextTick()вызовы , что не позволяет циклу обработки событий достичь фазы опроса .

// // Почему это разрешено?
// // Зачем что-то подобное включать в Node.js? Частично это философия дизайна, согласно которой API всегда должен быть асинхронным, даже если это не обязательно. Возьмем, к примеру, этот фрагмент кода:

// function apiCall(arg, callback) {
//   if (typeof arg !== 'string')
//     return process.nextTick(
//       callback,
//       new TypeError('argument should be string')
//     );
// }
// // Фрагмент проверяет аргумент и, если он неверен, передает ошибку обратному вызову. API был обновлен совсем недавно, чтобы разрешить передачу аргументов, process.nextTick()позволяя принимать любые аргументы, переданные после обратного вызова, для распространения в качестве аргументов обратного вызова, поэтому вам не нужно вкладывать функции.

// // Что мы делаем, так это возвращаем ошибку пользователю, но только после того, как разрешили выполнение остального кода пользователя. При использовании process.nextTick()мы гарантируем, что apiCall()всегда запускает свой обратный вызов после остального кода пользователя и до того, как цикл обработки событий будет разрешен. Для этого стек вызовов JS может раскручиваться, а затем немедленно выполнять предоставленный обратный вызов, который позволяет человеку выполнять рекурсивные вызовы, process.nextTick()не достигая файла RangeError: Maximum call stack size exceeded from v8.

// // Эта философия может привести к некоторым потенциально проблемным ситуациям. Возьмем, к примеру, этот фрагмент:

// let bar;

// // this has an asynchronous signature, but calls callback synchronously
// function someAsyncApiCall(callback) {
//   callback();
// }

// // the callback is called before `someAsyncApiCall` completes.
// someAsyncApiCall(() => {
//   // since someAsyncApiCall hasn't completed, bar hasn't been assigned any value
//   console.log('bar', bar); // undefined
// });

// bar = 1;
// // Пользователь определяет someAsyncApiCall()наличие асинхронной подписи, но на самом деле она работает синхронно. Когда он вызывается, обратный вызов, предоставленный для someAsyncApiCall(), вызывается в той же фазе цикла событий, потому someAsyncApiCall()что фактически ничего не делает асинхронно. В результате обратный вызов пытается сослаться, barдаже если эта переменная может еще не иметь этой переменной в области действия, потому что сценарий не смог выполниться до конца.

// // Поместив обратный вызов в a process.nextTick(), сценарий по-прежнему может выполняться до завершения, позволяя инициализировать все переменные, функции и т. д. до вызова обратного вызова. Это также имеет то преимущество, что не позволяет продолжаться циклу событий. Может быть полезно, чтобы пользователь был предупрежден об ошибке до того, как цикл обработки событий будет разрешен. Вот предыдущий пример с использованием process.nextTick():

// let bar;

// function someAsyncApiCall(callback) {
//   process.nextTick(callback);
// }

// someAsyncApiCall(() => {
//   console.log('bar', bar); // 1
// });

// bar = 1;
// // Вот еще один пример из реальной жизни:

// const server = net.createServer(() => {}).listen(8080);

// server.on('listening', () => {});
// // Когда передается только порт, порт привязывается немедленно. Таким образом, 'listening'обратный вызов может быть вызван немедленно. Проблема в том, что .on('listening')обратный вызов к этому времени еще не будет установлен.

// // Чтобы обойти это, 'listening'событие ставится в очередь, nextTick() чтобы позволить скрипту завершиться. Это позволяет пользователю устанавливать любые обработчики событий, которые он хочет.

// process.nextTick()противsetImmediate()
// // У нас есть два вызова, которые похожи с точки зрения пользователей, но их названия сбивают с толку.

// // process.nextTick()срабатывает сразу на той же фазе
// // setImmediate()срабатывает на следующей итерации или «тике» цикла событий
// // По сути, имена должны быть заменены местами. process.nextTick()срабатывает быстрее, чем setImmediate(), но это артефакт прошлого, который вряд ли изменится. Выполнение этого переключения приведет к поломке большого процента пакетов в npm. Каждый день добавляется больше новых модулей, а это значит, что каждый день ожидания происходит больше потенциальных поломок. Хотя они сбивают с толку, сами имена не изменятся.

// // Мы рекомендуем разработчикам использовать setImmediate()во всех случаях, потому что об этом легче рассуждать.

// // Зачем использовать process.nextTick()?
// // Есть две основные причины:

// // Разрешить пользователям обрабатывать ошибки, очищать все ненужные ресурсы или, возможно, повторить запрос, прежде чем цикл обработки событий продолжится.

// // Иногда необходимо разрешить выполнение обратного вызова после раскручивания стека вызовов, но до продолжения цикла обработки событий.

// // Одним из примеров является соответствие ожиданиям пользователя. Простой пример:

// const server = net.createServer();
// server.on('connection', (conn) => {});

// server.listen(8080);
// server.on('listening', () => {});
// // Скажем, listen() это запускается в начале цикла событий, но обратный вызов прослушивания помещается в файл setImmediate(). Если имя хоста не передано, привязка к порту произойдет немедленно. Чтобы цикл событий продолжался, он должен попасть в фазу опроса , что означает, что существует ненулевая вероятность того, что соединение могло быть получено, что позволяет запустить событие соединения до события прослушивания.

// // Другой пример — наследование EventEmitterи создание события внутри конструктора:

// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {
//   constructor() {
//     super();
//     this.emit('event');
//   }
// }

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });

// // Вы не можете немедленно сгенерировать событие из конструктора, потому что сценарий не будет обработан до точки, в которой пользователь назначает обратный вызов этому событию. Таким образом, внутри самого конструктора вы можете использовать process.nextTick()для установки обратного вызова для отправки события после завершения конструктора, что обеспечивает ожидаемые результаты:

// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {
//   constructor() {
//     super();

//     // use nextTick to emit the event once a handler is assigned
//     process.nextTick(() => {
//       this.emit('event');
//     });
//   }
// }

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });