// //change the limit to however many images to use
// const api_key = "4da9d153-3a26-448d-b55a-36abcbfc3810"
// const url = `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=beng&api_key=${api_key}`;
// // 1. Создаём новый XMLHttpRequest-объект
// let request = new XMLHttpRequest();
// // 2. Настраиваем его: GET-запрос
// request.open('GET', url);
// // 3. Отсылаем запрос
// request.send();
// // 4. Этот код сработает после того, как мы получим ответ сервера
// request.onload = function() {
//   if (request.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
//     alert(`Ошибка ${request.status}: ${request.statusText}`); // Например, 404: Not Found
//   } else { // если всё прошло гладко, выводим результат
//     console.log(request.responseText); // response -- это ответ сервера
//   }
// };

// fetch
const api_key = "4da9d153-3a26-448d-b55a-36abcbfc3810"
const url = `https://api.thecatapi.com/v1/images/search?limit=50&breed_ids=beng&api_key=${api_key}`;
 fetch(url).then((response) => {
   return response.json();
 }).then((data) => {
  let imagesData = data;
  imagesData.map(function(imageData) {
    let imgCat = document.createElement('img');
    imgCat.src = `${imageData.url}`; //use the url from the image object api
    document.querySelector('.container').appendChild(imgCat);
    });
}).catch(function(error) {
   console.log(error);
});