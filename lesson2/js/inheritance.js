class Car {
    //private properties
    #_model;
    #_origin;
    constructor(model, origin) {
        this.#_model = model;
        this.#_origin = origin;
    }
    getCar() { return `model:${this.#_model}\norigin:${this.#_origin}` }
}
class BMW extends Car {
    constructor(model, origin) {
        super(model, origin)
    }
}
class Opel extends Car {
    constructor(model, origin) {
        super(model, origin)
    }
}
//-------------------------------------
let carOpel = new Opel('opel', 2.2);
let carBMW = new BMW('bmw', 2.5);
//-------------------------------------
console.log(carOpel.getCar());
//-------------------------------------
console.log(carBMW.getCar());
//-------------------------------------