// // 1 способ Используя литерал регулярного выражения
// var re1 = /ab+c/;
// // 2 способ Вызывая функцию конструктор объекта RegExp
// var re2 = new RegExp("ab+c");

// var myRe = /d(b+)d/g;
// var myArray = myRe.exec("cdbbdbsbz");

// console.log(myArray);

// let str = `
// Hello, world! Academy Step
// Hello, world! Student
// Hello, world! Academy
// Hello, world! Step
// Hello, world! 123456789
// Hello, world! 123456789hello`;

// let testRegArr = /\d+h/g.exec(str);
// console.log(testRegArr);

// Примеры
// След. примеры показывают использование регулярных выражений.

// Изменение порядка в Исходной Строке
// След. пример иллюстрирует формирование регулярного выражения и использование string.split() и string.replace(). Он очищает неправильно сформатированную исходную строку, которая содержит имена в неправильном порядке (имя идёт первым) разделённые пробелами, табуляцией и одной точкой с запятой. В конце, изменяется порядок следования имён (фамилия станет первой) и сортируется список.

// // The name string contains multiple spaces and tabs,
// // and may have multiple spaces between first and last names.
// var names = "Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ; Chris Hand ";

// var output = ["---------- Original String\n", names + "\n"];

// // Prepare two regular expression patterns and array storage.
// // Split the string into array elements.

// // pattern: possible white space then semicolon then possible white space
// var pattern = /\s*;\s*/;

// // Break the string into pieces separated by the pattern above and
// // store the pieces in an array called nameList
// var nameList = names.split(pattern);

// // new pattern: one or more characters then spaces then characters.
// // Use parentheses to "memorize" portions of the pattern.
// // The memorized portions are referred to later.
// pattern = /(\w+)\s+(\w+)/;

// // New array for holding names being processed.
// var bySurnameList = [];

// // Display the name array and populate the new array
// // with comma-separated names, last first.
// //
// // The replace method removes anything matching the pattern
// // and replaces it with the memorized string—second memorized portion
// // followed by comma space followed by first memorized portion.
// //
// // The variables $1 and $2 refer to the portions
// // memorized while matching the pattern.

// output.push("---------- After Split by Regular Expression");

// var i, len;
// for (i = 0, len = nameList.length; i < len; i++){
//   output.push(nameList[i]);
//   bySurnameList[i] = nameList[i].replace(pattern, "$2, $1");
// }

// // Display the new array.
// output.push("---------- Names Reversed");
// for (i = 0, len = bySurnameList.length; i < len; i++){
//   output.push(bySurnameList[i]);
// }

// // Sort by last name, then display the sorted array.
// bySurnameList.sort();
// output.push("---------- Sorted");
// for (i = 0, len = bySurnameList.length; i < len; i++){
//   output.push(bySurnameList[i]);
// }

// output.push("---------- End");

// console.log(output.join("\n"));
// Copy to Clipboard
// Использование спецсимволов для проверки входных данных
// В след. примере, ожидается что пользователь введёт телефонный номер и требуется проверить правильность символов набранных пользователем. Когда пользователь нажмёт кнопку "Check", скрипт проверит правильность введённого номера. Если номер правильный (совпадает с символами определёнными в регулярном выражении), то скрипт покажет сообщение благодарности для пользователя и подтвердит номер. Если нет, то скрипт проинформирует пользователя, что телефонный номер неправильный.

// Внутри незахватывающих скобок (?:, регуляное выражение ищет три цифры \d{3} ИЛИ | открывающую скобку \(, затем три цифры \d{3}, затем закрывающую скобку \), (закрывающая незахватывающая скобка )), затем тире, слеш, или десятичная точка, и когда это выражение найдено, запоминает символ ([-\/\.]), следующие за ним и запомненные три цифры \d{3}, следующее соответствие тире, слеша или десятичной точки \1, и следующие четыре цифры \d{4}.

// Регулярное выражение ищет сначала 0 или одну открывающую скобку \(?, затем три цифры \d{3}, затем 0 или одну закрывающую скобку \)?, потом одно тире, слеш или точка и когда найдёт это, запомнит символ([-\/\.]), след. три цифры \d{3}, followed by the remembered match of a dash, forward slash, or decimal point \1, followed by four digits \d{4}.

// Событие "Изменить" активируется, когда пользователь подтвердит ввод значения регулярного выражения, нажав клавишу "Enter".

// <!DOCTYPE html>
// <html>
//   <head>
//     <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//     <meta http-equiv="Content-Script-Type" content="text/javascript">
//     <script type="text/javascript">
//       var re = /\(?\d{3}\)?([-\/\.])\d{3}\1\d{4}/;
//       function testInfo(phoneInput){
//         var OK = re.exec(phoneInput.value);
//         if (!OK)
//           window.alert(RegExp.input + " isn't a phone number with area code!");
//         else
//           window.alert("Thanks, your phone number is " + OK[0]);
//       }
//     </script>
//   </head>
//   <body>
//     <p>Enter your phone number (with area code) and then click "Check".
//         <br>The expected format is like ###-###-####.</p>
//     <form action="#">
//       <input id="phone"><button onclick="testInfo(document.getElementById('phone'));">Check</button>
//     </form>
//   </body>
// </html>
// Copy to Clipboard
// autoPreviousNext("JSGChapters");