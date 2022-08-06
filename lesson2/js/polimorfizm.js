
class Car {
    //private properties
    #_model;
    #_origin;
    constructor(model, origin) {
        this.#_model = model;
        this.#_origin = origin;
    }
    getCar() { return `model:${this.#_model}\norigin:${this.#_origin}` }
    gaz() { console.log('gaz from Car'); }
}
class BMW extends Car {
    constructor(model, origin) {
        super(model, origin)
    }
    gaz() { console.log('gaz from BMW'); }
}
class Opel extends Car {
    constructor(model, origin) {
        super(model, origin)
    }
    gaz() { console.log('gaz from Opel'); }
}
//-------------------------------------
let carOpel = new Opel('opel', 2.2);
let carBMW = new BMW('bmw', 2.5);
//-------------------------------------
carOpel.gaz()
//-------------------------------------
carBMW.gaz()
//-------------------------------------
//-------------------------------------
// abstract class constructor
//-------------------------------------
var Phone = function() {
    if(this.constructor === Phone)
        throw new Error("Can't create abstract class!"); // You can’t create to object from abstract class
};
//-------------------------------------
// abstract method
//-------------------------------------
Phone.prototype.call = function() { throw new Error("Abstract method!") };

class Nokia extends Phone {
    call() { console.log('Nokia' + ' => call()'); }
}
class Samsung extends Phone {
    call() { console.log('Samsung' + ' => call()'); }
}
class Sony extends Phone {
    call() { console.log('Sony' + ' => call()'); }
}

function PhoneCall(phone) {
    phone.call();
}

// var phone = new Phone(); // Error
PhoneCall(new Nokia())
PhoneCall(new Samsung())
PhoneCall(new Sony())