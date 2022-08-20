//-------------------------------------------
// Пример синхронного http запроса на сервер
//-------------------------------------------
/*
    request.responseText - это просто строка, но еще далеко не массив объектов!!!
    Для этого мы используем JSON.parse(request.responseText) этот парсер создаст из json массив объектов
*/
var request = new XMLHttpRequest();
request.open('GET', 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', false);  // `false` делает запрос синхронным
request.send(null);
if (request.status === 200) {
    let monies = JSON.parse(request.responseText); // создать массив объектов из json строки
    for (const [index, money] of monies.entries()) {
        // example one object
        //{ "r030":36,"txt":"Австралійський долар","rate":25.7004,"cc":"AUD","exchangedate":"16.08.2022" }
        addElement('div', 'Курс на поточну дату:<br>', `newMoneyBlockId${index}`, '.container');
        addElement('i', money.txt, `${index}newMoneyTXTId`, `#newMoneyBlockId${index}`);
        addElement('i', money.rate, `newMoneyRateId${index}`, `#newMoneyBlockId${index}`);
        addElement('i', money.cc, `newMoneyCCId${index}`, `#newMoneyBlockId${index}`);
        addElement('strong', money.exchangedate, `newMoneyDateId${index}`, `#newMoneyBlockId${index}`);
    }
} else {
    throw new Error('request bad status = ', request.status); // exception request
}
//--------------------------------------------
// Функция добавляет новый тег в дом дерево
//--------------------------------------------
function addElement(elementName, elementContent, elementId, parentElementSelector) {
    // Создаём новый элемент 
    let childElement = document.createElement(elementName);
        childElement.innerHTML = elementContent;
        childElement.setAttribute("id", elementId); // Добавить атрибут id новому элементу
    // Добавляем только что созданный элемент в будущий родитель
    let parentElement = document.querySelector(parentElementSelector);
    if(parentElement === null) {
        throw new Error('error querySelector', parentElement); // exception querySelector
    }
    parentElement.appendChild(childElement); // Добавить ребенка родителю
    return childElement;
}
// Поиск через API
function searchElement() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', false);  // `false` делает запрос синхронным
    request.send(null);
if (request.status === 200) {
    let monies = JSON.parse(request.responseText); // создать массив объектов из json строки
    let key = document.getElementById('searchInputId')
    .value;
    for (const money of monies) {
        if(key == money.txt) {
            alert(money.rate)
            key = null;
        }
    }
    if(key !== null) alert('not found!');
} else {
    throw new Error('request bad status = ', request.status); // exception request
}
}
