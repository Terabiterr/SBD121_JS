//----------------------------------------------------------
// Контекст this JS
//----------------------------------------------------------
(function Context() {
    console.log('Context', this)
})();
const company = { name: 'Hexlet', employees: [] };
company.getName = function getName() {
  return this.name;
};

company.getName(); // "Hexlet"
company.name = 'Hexlet Plus';
company.getName(); // "Hexlet Plus"

company.setName = function setName(name) {
    this.name = name;
  };
company.getName(); // "Hexlet"
company.setName('Hexlet Plus');
company.getName(); // "Hexlet Plus"
//----------------------------------------------------------
// this
//----------------------------------------------------------
// function Context() {
//     console.log('Function context\n', this);
// }
// const person = {
//     name: 'Alex',
//     age: 27,
//     callContext: Context
// }

// person.callContext();
// window.Context();

//----------------------------------------------------------
// let user = {
//     id: 1,
//     name: "user1",
//     languages: function() { 
//         console.log('C++', 'JS', 'HTML', 'CSS', '\ncall from context user:\n', this);
//     }
// }

// user.languages();
//----------------------------------------------------------
// bind()
//----------------------------------------------------------
// this.x = 9;
// var module = {
//   x: 81,
//   getX: function() { return this.x; }
// };

// module.getX(); // 81

// var getX = module.getX;
// getX(); // 9, поскольку в этом случае this ссылается на глобальный объект

// // создаём новую функцию с this, привязанным к module
// var boundGetX = getX.bind(module);
// boundGetX(); // 81
// //----------------------------------------------------------
// // частичная функция / bind()
// //----------------------------------------------------------
// function list() {
//     return Array.prototype.slice.call(arguments);
//   }
  
//   var list1 = list(1, 2, 3); // [1, 2, 3]
  
//   // Создаём функцию с предустановленным ведущим аргументом
//   var leadingThirtysevenList = list.bind(undefined, 37);
  
//   var list2 = leadingThirtysevenList(); // [37]
//   var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
//----------------------------------------------------------
// call()
//----------------------------------------------------------
// Реализация наследования с помощью call()
  function Product(name, price) {
    this.name = name;
    this.price = price;
  
    if (price < 0) {
      throw RangeError('Нельзя создать продукт ' +
                        this.name + ' с отрицательной ценой');
    }
  }
  
  function Food(name, price) { // 
    Product.call(this, name, price); // вызов конструктора
    this.category = 'еда';
  }
  
  Food.prototype = Object.create(Product.prototype); // создание прототипа для Food

  var cheese = new Food('фета', 5);
  console.log(`Food: ${cheese.name} => price: ${cheese.price}`)
  //----------------------------------------------------------
  // Пример call() для вызова анонимной функции
  //----------------------------------------------------------
//   var animals = [
//     { species: 'Лев', name: 'Король' },
//     { species: 'Кит', name: 'Фэйл' }
//   ];
  
//   for (var i = 0; i < animals.length; i++) {
//     (function(i) {
//       this.print = function() {
//         console.log('#' + i + ' ' + this.species
//                     + ': ' + this.name);
//       }
//       this.print();
//     }).call(animals[i], i);
//   }
