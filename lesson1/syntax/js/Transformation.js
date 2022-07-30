//Строковое преобразование
let value = true;
alert(typeof value); // boolean
value = String(value); // теперь value это строка "true"
alert(typeof value); // string
// Преобразование происходит очевидным образом. false становится "false", null становится "null"
//Численное преобразование
// Численное преобразование происходит в математических функциях и выражениях.
// Например, когда операция деления / применяется не к числу:
alert( "6" / "2" ); // 3, строки преобразуются в числа
let str = "123";
alert(typeof str); // string
let num = Number(str); // становится числом 123
alert(typeof num); // number
let age = Number("Любая строка вместо числа");
alert(age); // NaN, преобразование не удалось
// Значение	Преобразуется в…
// undefined	NaN
// null	0
// true / false	1 / 0
// string	Пробельные символы по краям обрезаются. Далее, если остаётся пустая строка, то получаем 0, иначе из непустой строки «считывается» число. При ошибке результат NaN.
// Примеры:
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (ошибка чтения числа на месте символа "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
//Логическое преобразование
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false
alert( Boolean("Привет!") ); // true
alert( Boolean("") ); // false
