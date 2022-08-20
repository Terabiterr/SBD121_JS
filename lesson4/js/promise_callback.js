//Вариант на обычных callback
// function doSomethingOldStyle(successCallback, failureCallback) {
//   console.log("Готово.");
//   // Успех в половине случаев.
//   if (Math.random() > 0.5) {
//     successCallback("Успех")
//   } else {
//     failureCallback("Ошибка")
//   }
// }

// function successCallback(result) {
//   console.log("Успешно завершено с результатом " + result);
// }

// function failureCallback(error) {
//   console.log("Завершено с ошибкой " + error);
// }

// doSomethingOldStyle(successCallback, failureCallback);

//Promise
// function doSomething() {
//   return new Promise((resolve, reject) => {
//     console.log("Готово.");
//     // Успех в половине случаев.
//     if (Math.random() > .5) {
//       resolve("Успех")
//     } else {
//       reject("Ошибка")
//     }
//   })
// }

// const promise = doSomething();
// promise.then(successCallback, failureCallback);

// doSomething().then(successCallback, failureCallback);

// let promise = doSomething();
// let promise2 = promise.then(successCallback, failureCallback);

// let promise2 = doSomething().then(successCallback, failureCallback);
//Вавилонской башне
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Итоговый результат: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

// // var promise = new Promise(function(resolve, reject) {
// //     // Эта функция будет вызвана автоматически
  
// //     // В ней можно делать любые асинхронные операции,
// //     // А когда они завершатся — нужно вызвать одно из:
// //     // resolve(результат) при успешном выполнении
// //     // reject(ошибка) при ошибке
// //   })
// //   promise.then(onFulfilled, onRejected)

// // // onFulfilled сработает при успешном выполнении
// // promise.then(onFulfilled)
// // // onRejected сработает при ошибке
// // promise.then(null, onRejected)

// // Создаётся объект promise
// let promise = new Promise((resolve, reject) => {

//     setTimeout(() => {
//       // переведёт промис в состояние fulfilled с результатом "result"
//       resolve("result");
//     }, 1000);
  
//   });
  
//   // promise.then навешивает обработчики на успешный результат или ошибку
//   promise
//     .then(
//       result => {
//         // первая функция-обработчик - запустится при вызове resolve
//         alert("Fulfilled: " + result); // result - аргумент resolve
//       },
//       error => {
//         // вторая функция - запустится при вызове reject
//         alert("Rejected: " + error); // error - аргумент reject
//       }
//     );