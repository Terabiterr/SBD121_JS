let arr = new Array(1, 2, true, () => {});
arr.userMethodLesson4 = () => {
    arr.forEach((item) => {
        console.log(item);
    })
};
arr.userMethodLesson4();
// const numbers = [1, 4, 9];
// const roots = numbers.map(Math.sqrt);
// // теперь roots равен [1, 2, 3], а numbers всё ещё равен [1, 4, 9]
// const numbers = [1, 4, 9];
// const doubles = numbers.map((num) => num * 2);
// // теперь doubles равен [2, 8, 18], а numbers всё ещё равен [1, 4, 9]
// const map = Array.prototype.map;
// const charCodes = map.call('Hello World', (x) => x.charCodeAt(0));
// // теперь charCodes равен [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
// const string = '12345';
// const reversed = Array.prototype.map.call(string, (x) => x).reverse().join('');
// // reversed равен '54321'
// // Бонус: используйте '===' для проверки того, является ли строка палиндромом
// // map
// const collection = new Map();
// const key = {};
// collection.set(key, 100500);
// console.log(collection);

// class MapCollection {
//     #keys = []
//     #values = []
//     constructor(iterable = null) {
//         if(iterable) {
//             for (const [key, value] of iterable) {
//                 this.set(key, value);
//             }
//         }
//     }
//     set (key, value) {
//         if(this.#keys.includes(key)) {
//             const index = this.#keys.indexOf(key);
//             this.#values[index] = value;
//         } else {
//             this.#keys.push(key);
//             this.#values.push(value);
//         }
//     }
//     get (key) {
//         if(this.#keys.includes(key)) {
//             const index = this.#keys.indexOf(key);
//             return this.#values[index];
//         }
//     }
//     get size() {
//         return this.#keys.length;
//     }
// }
// const mc = new MapCollection([
//     ['key', 'value']
// ]);

// const key = {};
// mc.set(key, 100500);

// console.log(mc.size);
// console.log(mc.get(key));