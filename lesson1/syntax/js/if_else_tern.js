//if
var hi = 'hi'
if(hi === 'hi') console.log('Alex:' + hi)
//if else
if(hi === 'hi') console.log('Alex:' + hi)
else console.log('Alex:' + 'by')
//else if
if (hi === 'hi') {
    console.log('Alex:' + hi)
  } else if (hi !== 'hi') {
    console.log('Alex:' + 'by')
  } else if (hi === 'by') {
    console.log('Alex:' + 'hi')
  } else {
    console.log('Alex:' + '?')
  }
//--------------------------------------------------------------------------------------
//switch
switch (membershipStatus) {
    case "vip":
      // выполнится, если в переменной membershipStatus хранится строка "vip"
      console.log("Приветствуем вас, ваше великолепие!")
      console.log("рады вас видеть!")
      break
    case "diamond":
      console.log("Здравствуйте, бриллиантовый клиент!")
      break
    case "gold":
      console.log("Привет, золотой мой!")
      break
    default:
      // выполнится, если ни один другой случай не сработал
      console.log("Прив")
      break
  }

switch (memberStatus) {
  case "vip":
    discount = 0.25
    break
  case "diamond":
    discount = 0.2
    break
  case "gold":
  case "silver":
    // можно написать несколько кейсов и связать с одним блоком
    discount = 0.1
    break
  default:
    discount = 0
    break
}
//Тернарные операции
// Тернарная операция
// Тернарная операция состоит из трех операндов и имеет следующее определение:
// [первый операнд - условие] ? [второй операнд] : [третий операнд]
// В зависимости от условия в первом операнде тернарная операция возвращает второй или третий операнд. Если условие в первом операнде равно true, то возвращается второй операнд; если условие равно false, то третий. Например:
const a = 1;
const b = 2;
const result = a < b ? a: b;
console.log(result); // 1
// Здесь первый операнд представляет следующее условие a < b. Если значение константы a меньше значения константы b, то возвращается второй операнд - a, то есть константа result будет равна a.
// Если значение константы a больше или равно значению константы b, то возвращается третий операнд - b, поэтому константа result будет равна значению b.
// В качестве операндов также могут выступать выражения:
const a = 1;
const b = 2;
const result = a < b ? a + b : a - b;
console.log(result); // 3
// В этом примере кода первый операнд представляет то же самое условие, что и в предыдущем примере, однако второй и третий операнды представляют арифметические операции. Если значение константы a меньше значения константы b, то возвращается второй операнд - a + b. Соответственно константа result будет равна сумме a и b.
// Если значение константы a больше или равно значению константы b, то возвращается третий операнд - a - b. Соответственно константа result будет равна разности a и b.
// Оператор ??
// Оператор ?? (nullish coalescing operator) позволяет проверить значение на null и undefined. Он принимает два операнда:
// левый_операнд ?? правый_операнд
// Оператор возвращает значение левого операнда, если оно НЕ равно null и undefined. Иначе возвращается значение правого операнда. Например:
const result1 = "hello" ?? "world";
console.log(result1);   // hello
const result2 = 0 ?? 5;
console.log(result2);   // 0
const result3 = "" ?? "javascript";
console.log(result3);   // "" - пустая строка
const result4 = false ?? true;
console.log(result4);   // false
const result5 = null ?? "not null";
console.log(result5);   // not null
const result6 = undefined ?? "defined";
console.log(result6);   // defined
let message = null;
const hello = "Hi JavaScript";
const result7 = message ?? hello;
console.log(result7);   // Hi JavaScript
// Оператор =??
// Оператор ?? имеет модификацию в виде оператора ??=, который также позволяет проверить значение на null и undefined. Он принимает два операнда:
// левый_операнд ??= правый_операнд
// Если левый операнд равен null и undefined, то ему присваивается значение правого операнда. Иначе левый операнд сохраняет свое значение. Например:
let message = "Welcome to JavaScript";
let text = "Hello work!"
text ??= message;
console.log(text);  // Hello work!
// Здесь переменная text не равна null или undefined, поэтому она сохраняет свое значение. Обратный пример:
let message = "Welcome to JavaScript";
let text = null;
text ??= message;
console.log(text);  // Welcome to JavaScript
// Здесь переменная text равна null, поэтому при посредстве оператора ??= она получает значение переменной message.