// function Person(first, last, age, gender, interests) {

//     // Определения методов и свойств
//     this.name = {
//       'first': first,
//       'last' : last
//     };
//     this.age = age;
//     this.gender = gender;
// }
// //Затем мы создаём экземпляр объекта следующим образом:
// var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
// расширение прототипа
var animal = {
    eats: true
};
var rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;
console.log(rabbit.eats)
console.log(rabbit.jumps)

  