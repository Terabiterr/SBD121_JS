// Синхронный callback
// function greeting(name) {
//     alert('Hello ' + name);
//   }
  
//   function processUserInput(callback) {
//     var name = prompt('Please enter your name.');
//     callback(name);
//   }
  
//   processUserInput(greeting);
  //Асинхронный callback
//   async function pageLoader(callback) {
//     // Ждем операцию fetch
//     const data = await fetch('/ru/docs/Glossary/Callback_function')
//     // После выполенения операции fetch
//     callback(data)
//   }
  
//   function onPageLoadingFinished(pageData) {
//     console.log('Page was sucessfully loaded!')
//     console.log('Response:')
//     console.log(pageData)
//   }
  
//   pageLoader(onPageLoadingFinished)
// // определяем нашу функцию с аргументом callback
// function some_function(arg1, arg2, callback) {
//     // переменная, генерирующая случайное число в интервале между arg1 и arg2
//     var my_number = Math.ceil(Math.random() * (arg1 - arg2) + arg2);
//     // теперь всё готово и  мы вызываем callback, куда передаём наш результат
//     callback(my_number);
// }
// // вызываем функцию
// some_function(5, 15, function (num) {
//     // эта анонимная функция выполнится после вызова callback-функции
//     console.log("callback called! " + num);
// });

// Ajax запрос на базе callback функции
function getApiBankXML(url, callback) {
    var httpRequest; // создаём наш XMLHttpRequest-объект
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // для дурацкого Internet Explorer'а
        httpRequest = new
        ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function () {
        // встраиваем функцию проверки статуса нашего запроса
        // это вызывается при каждом изменении статуса
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            callback.call(httpRequest.responseXML); // вызываем колбек
        }
    };
    httpRequest.open('GET', url);
    httpRequest.send();
}
// вызываем функцию
getApiBankXML("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange", function () {
    console.log(this);
});
console.log("это выполнится до вышеуказанного колбека");