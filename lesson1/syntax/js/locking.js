//--------------------------------------------------------------
// замыкание
//--------------------------------------------------------------
/*
    Область видимости count находится в области видимости функции counterLocal
*/
//--------------------------------------------------------------
  function counterLocal() {
    let countLocal = 0;
    return ++countLocal;
  }
  console.log('local count:' + counterLocal()) // 1
  console.log('local count:' + counterLocal()) // 1
  console.log('local count:' + counterLocal()) // 1
//--------------------------------------------------------------
/*
    Область видимости count находится в области видимости глобально (На уровне всего скрипта)
*/
//--------------------------------------------------------------
let countGlobal = 0;
function counterGlobal() { 
    return ++countGlobal; 
}
  console.log('global count:' + counterGlobal()) // 1
  console.log('global count:' + counterGlobal()) // 2
  console.log('global count:' + counterGlobal()) // 3
//--------------------------------------------------------------
/*
    Область видимости count находится в области видимости своего родителя (В данном случаи функции counter)
*/
//--------------------------------------------------------------
function counter() {
    let countLock = 0;  // closed
    return function () {
        return ++countLock;
    }; 
}
let startCounter = counter();
  console.log('lock count:' + startCounter()) // 1
  console.log('lock count:' + startCounter()) // 2
  console.log('lock count:' + startCounter()) // 3
//----------------------------------------------------------------
// Как сделать private с помощью замыкания?
//----------------------------------------------------------------
// Для приватных свойств надо использовать замыкания и символы.

 const Animal = (function () {
     const privatePropSymbol = Symbol("privateProp");

     class Animal {
         // гетеры и сеттеры для свойства
         get PrivateProp() { return this[privatePropSymbol]; }
         set PrivateProp(value) { this[privatePropSymbol] = value } 
     }

     Animal.prototype[privatePropSymbol] = "default value";
     return Animal;
 })();
// Фокус в том, что два символа с одинаковым названием остаются двумя разными символами - поэтому не имея переменной privatePropSymbol внешний код не сможет получить к нему доступ.