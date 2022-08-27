// // const btn = document.querySelector('button');
// // btn.addEventListener('click', () => {
// //   let myDate;
// //   for(let i = 0; i < 10000000; i++) {
// //     let date = new Date();
// //     myDate = date
// //   }

// //   console.log(myDate);

// //   let pElem = document.createElement('p');
// //   pElem.textContent = 'This is a newly-added paragraph.';
// //   document.body.appendChild(pElem);
// // });

// // Async callbacks
// // btn.addEventListener('click', () => {
// //     alert('You clicked me!');
  
// //     let pElem = document.createElement('p');
// //     pElem.textContent = 'This is a newly-added paragraph.';
// //     document.body.appendChild(pElem);
// //   });

//   // Своя функция callback
// //   function loadAsset(url, type, callback) {
// //     const xhr = new XMLHttpRequest();
// //     xhr.open('GET', url);
// //     xhr.responseType = type;
  
// //     xhr.onload = function() {
// //       callback(xhr.response);
// //     };
  
// //     xhr.send();
// //   }
  
// //   function displayImage(blob) {
// //     const objectURL = URL.createObjectURL(blob);
  
// //     const image = document.createElement('img');
// //     image.src = objectURL;
// //     document.body.appendChild(image);
// //   }
  
// //   loadAsset('coffee.jpg', 'blob', displayImage);

// // Пример синхронного callback
// // const gods = ['Apollo', 'Artemis', 'Ares', 'Zeus'];

// // gods.forEach(function (eachName, index){
// //   console.log(index + '. ' + eachName);
// // });

// // Promises
// // fetch('products.json')
// //   .then( response => {
// //     if (!response.ok) {
// //       throw new Error(`HTTP error: ${response.status}`);
// //     }
// //     return response.json();
// //   })
// //   .then( json => initialize(json) )
// //   .catch( err => console.error(`Fetch problem: ${err.message}`) );

// // Пример порядка выполнения console.log
// console.log ('Starting');
// let image;

// fetch('coffee.jpg').then((response) => {
//   console.log('It worked :)')
//   return response.blob();
// }).then((myBlob) => {
//   const objectURL = URL.createObjectURL(myBlob);
//   image = document.createElement('img');
//   image.src = objectURL;
//   document.body.appendChild(image);
// }).catch((error) => {
//   console.log('There has been a problem with your fetch operation: ' + error.message);
// });

// console.log ('All done!');
// /*
// Браузер начнёт выполнение кода, увидит первый консольный оператор (Starting) и выполнит его, а затем создаст переменную image.

// Затем он переместится на следующую строку и начнёт выполнять блок fetch (), но, поскольку fetch () выполняется асинхронно без блокировки, выполнение кода продолжается после кода, связанного с промисом, тем самым достигая окончательного оператора (All done!) и выводя его на консоль.

// Только после того, как блок fetch () полностью завершит работу и доставит свой результат через блоки .then (), мы наконец увидим второе сообщение console.log () (It worked ;)). Таким образом, сообщения появились не в том порядке, который вы могли ожидать:

// Starting
// All done!
// It worked :)
// */

// console.log("registering click handler");

// button.addEventListener('click', () => {
//   console.log("get click");
// });

// console.log("all done");

//-------------------------------------------------
// Event Loop
//-------------------------------------------------
// Stack
// function f(b) {
//     var a = 12;
//     return a + b + 35;
//   }
  
//   function g(x) {
//     var m = 4;
//     return f(m * x);
//   }
  
//   g(21);
  // Heap
//   function User(id, name, lastName) {
//     this.id = id;
//     this.name = name;
//     this.lastName = lastName;
//   }

//   class Hero extends User {
//     constructor(hp, id, name, lastName) {
//         super(id, name, lastName);
//         this.hp = hp;
//     }
//   }
//   // queue 
//   while(queue.waitForMessage()){
//     queue.processNextMessage();
//   }

// Нулевая задержка
// (function () {

//     console.log('this is the start');
  
//     setTimeout(function cb() {
//       console.log('this is a msg from call back');
//     });
  
//     console.log('this is just a message');
  
//     setTimeout(function cb1() {
//       console.log('this is a msg from call back1');
//     }, 0);
  
//     console.log('this is the end');
  
//   })();
  
//   // "this is the start"
//   // "this is just a message"
//   // "this is the end"
//   // "this is a msg from call back"
//   // "this is a msg from call back1"

  // async await
//   function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(x);
//       }, 2000);
//     });
//   }
  
//   async function add1(x) {
//     const a = await resolveAfter2Seconds(20);
//     const b = await resolveAfter2Seconds(30);
//     return x + a + b;
//   }
  
//   add1(10).then(v => {
//     console.log(v);  // prints 60 after 4 seconds.
//   });
  
//   async function add2(x) {
//     const a = resolveAfter2Seconds(20);
//     const b = resolveAfter2Seconds(30);
//     return x + await a + await b;
//   }
  
//   add2(10).then(v => {
//     console.log(v);  // prints 60 after 2 seconds.
//   });

  // exceptions async
//   async function throwsValue() {
//     throw new Error('oops');
// }
// throwsValue()
//     .then((resolve) => {
//             console.log("resolve:" + resolve);
//         },
//         (reject) => {
//             console.log("reject:" + reject);
//         });
// //prints "reject:Error: oops"
// //or
// throwsValue()
//     .then((resolve) => {
//         console.log("resolve:" + resolve);
//     })
//     .catch((reject) => {
//         console.log("reject:" + reject);
//     });
// //prints "reject:Error: oops"

// Замена Promise на async
// function getProcessedData(url) {
//     return downloadData(url) // returns a promise
//       .catch(e => {
//         return downloadFallbackData(url) // returns a promise
//       })
//       .then(v => {
//         return processDataInWorker(v); // returns a promise
//       });
//   }

//   //он может быть переписан с одним использованием функции async:

// async function getProcessedData(url) {
//   let v;
//   try {
//     v = await downloadData(url);
//   } catch(e) {
//     v = await downloadFallbackData(url);
//   }
//   return processDataInWorker(v);
// }