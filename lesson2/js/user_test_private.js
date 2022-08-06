class User {
    //-------------------------------------
    //private properties
    //-------------------------------------
    #id;
    #name;
    #surname;
    constructor(id, name, surname) {
        this.#id = id;
        this.#name = name;
        this.#surname = surname;
    }
    get _id() { return this.#id; }
    set _id(id) { this.#id = id; }
    get _name() { return this.#name; }
    set _name(name) { this.#name = name; }
    get _surname() { return this.#surname; }
    set _surname(surname) { this.#surname = surname; }
    //-------------------------------------
    //private methods
    //-------------------------------------
    #userPrivateMethod() { /*...*/ }
}

let user = new User(1, 'Alex', 'Swift');
//console.log(user.#id); // private property [error]
console.log(user._id); // Good!
// user.#userPrivateMethod(); // Error