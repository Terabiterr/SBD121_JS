// Функции
function Hello() { // Simple
    console.log('Func = Hello()')
}

const arr = [1, 2.25, 'Hello, World!', true, Hello] // ссылка на функцию в элементе 4
let iterator = 0;

function Foo(arr) { // Функция с параметром
    arr.forEach(item => { // стрелочная функция
        if(iterator++ === 4) item()
        else console.log(item) 
    });
}

Foo(arr) // Запуск функции

let message = function(){ // Анонимная функция
    console.log("Hello JavaScript");
}
message();
function sum(x = 8, y = 5){ // необязательные параметры
    const z = x + y;
    console.log(z);
}
sum();      // 13
sum(6);     // 11
sum(6, 4)   // 10

function sum(){
    let result = 0;
    for(const n of arguments) // Массив аргументов
        result += n;
    console.log(result);
}
sum(6);             // 6
sum(6, 4)           // 10
sum(6, 4, 5)        // 15
/*
Неопределенное количество параметров
С помощью оператора ... 
(многоточие) мы можем указать, что с помощью параметра можно передать переменное количество значений:
*/
function display(season, ...temps){
    console.log(season);
    for(index in temps){
        console.log(temps[index]);
    }
}
display("Весна", -2, -3, 4, 2, 5);
display("Лето", 20, 23, 31);
//--------------------------------------------------------------------------
//Функции в качестве параметров
//Функции могут выступать в качестве параметров других функций:
function sum(x, y){
    return x + y;
}
 
function subtract(x, y){
    return x - y;
}
 
function operation(x, y, func){
  
    const result = func(x, y);
    console.log(result);
}
 
console.log("Sum");
operation(10, 6, sum);  // 16
 
console.log("Subtract");
operation(10, 6, subtract); // 4

//------------------------------------------
function menu(n){ // Вернуть значение функции
  
    if(n==1) return function(x, y){ return x + y;}
    else if(n==2) return function(x, y){ return x - y;}
    else if(n==3) return function(x, y){ return x * y;}
    return function(){ return 0;}
}
//------------------------------------------
// Рекурсивные функции
//------------------------------------------
function getFactorial(n){
    if (n === 1){
        return 1;
    }
    else{
         
        return n * getFactorial(n - 1);
    }
}
var result = getFactorial(4); 
console.log(result); // 24
// Функции обладают возможностью для переопределения поведения. Переопределение происходит с помощью присвоения анонимной функции переменной, которая называется так же, как и переопределяемая функция:
function display(){
    console.log("Доброе утро");
    display = function(){
        console.log("Добрый день");
    }
}
 
display(); // Доброе утро
display(); // Добрый день
// Передача параметров по значению и ссылке
// Передача параметров по значению
function change(x){
    x = 2 * x;
    console.log("x in change:", x);
}
 
var n = 10;
console.log("n before change:", n); // n before change: 10
change(n);                          // x in change: 20
console.log("n after change:", n);  // n after change: 10
// по ссылке
function change(user){
    user.name = "Tom";
}
 
var bob ={ 
    name: "Bob"
};
console.log("before change:", bob.name);    // Bob
change(bob);
console.log("after change:", bob.name);     // Tom
//------------------------------------------------------
// стрелочные функции
//------------------------------------------------------
// Стрелочные функции (arrow functions) позоляют сократить определение обычных функций. Стрелочные функции образуются с помощью знака стрелки (=>), перед которым в скобках идут параметры функции, а после - собственно тело функции.
// (параметры) => действия_функции
// Для примера возьмем сначала обычную примитивную функцию, которая выводит сообщение на консоль:

function hello(){
    console.log("Hello");
}
hello();    // вызываем функцию
// Теперь переделаем ее в стрелочную функцию:

let hello = ()=> console.log("Hello");
hello();
// В данном случае стрелочная функция присваивается переменной hello, через которую затем можно вызвать данную функцию.
// Здесь мы не используем параметры, поэтому указываются пустые скобки ()=> console.log("Hello");
// Далее через имя переменной мы можем вызвать данную функцию.
// Передача параметров
// Теперь определим стрелочную функцию, которая принимает один параметр:
let print = (mes)=> console.log(mes);
print("Hello Metanit.com");
print("Welcome to JavaScript");
// Здесь стрелочная функция принимает один параметр mes, значение которого выводится на консоль браузера.
// Если стрелочная функция имеет только один параметр, то скобки вокруг списка параметров можно опустить:
let print = mes=> console.log(mes);
print("Hello Metanit.com");
print("Welcome to JavaScript");
// Другой пример - передадим два параметра:
let sum = (x, y)=> console.log("Sum =", x + y);
sum(1, 2);      // Sum = 3
sum(4, 3);      // Sum = 7
sum(103, 2);    // Sum = 105
// Возвращение результата
// Чтобы возвратить значение из стрелочной функции, нам lостаточно указать его после стрелки. Например, определим функцию, которая возвращает сумму двух чисел:
let sum = (x, y)=> x + y;
console.log(sum(1, 2));     // 3
console.log(sum(4, 3));     // 7
console.log(sum(102, 5));   // 105
// Другой пример - возвратим отфарматированную строку:
const hello = name => `Hello, ${name}`;
console.log(hello("Tom"));              // Hello, Tom
console.log(hello("Bob"));              // Hello, Bob
console.log(hello("Frodo Baggins"));    // Hello, Frodo Baggins
// В данном случае функция hello принимает один параметр name - условное имя и создает на его основе сообщение с приветствием.
// Возвращение объекта
// Особо следует остановиться на случае, когда стрелочная функция возвращает объект:
let user = (userName, userAge) => ({name: userName, age: userAge});
let tom = user("Tom", 34);
let bob = user("Bob", 25);
console.log(tom.name, tom.age);     // "Tom", 34
console.log(bob.name, bob.age);     // "Bob", 25
// Объект также определяется с помощью фигурных скобок, но при этом он заключается в круглые скобки.
// Функция из нескольких инструкций
// Выше в примерах все стрелочные функции имели только одну инструкцию. Если же функция должна выполнять больше действий, то они, как и в обычной функции, заключаются в фигурные скобки:
const square = n => {
    let result = n * n;
    console.log(result);
}
square(5);     // 25
square(6);     // 36
// А если надо возвратить результат, применяется оператор return, как в обычной функции:
const square = n => {
    let result = n * n;
    return result;
}
console.log(square(5));     // 25
