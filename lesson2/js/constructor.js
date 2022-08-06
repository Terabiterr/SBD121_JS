class Person {
    //-------------------------------------
    // constructor
    //-------------------------------------
    constructor(id, name, lastName, age, sex = true) {
        this._id = id
        this._name = name;
        this._lastName = lastName;
        this._age = age >= 18 ? age : 18;
        this._sex = sex;
    }
    //-------------------------------------
    //getters and setters
    //-------------------------------------
    get id() { return this._id; }
    set id(value) { [this._id] = value; }
    //-------------------------------------
    //getters and setters
    //-------------------------------------
    get name() { return this._name; }
    set name(value) { [this._name] = value; }
    //-------------------------------------
    //getters and setters
    //-------------------------------------
    get lastName() { return this._lastName; }
    set lastName(value) { [this._lastName] = value; }
    //-------------------------------------
    //getters and setters
    //-------------------------------------
    get age() { return this._age; }
    set age(value) { [this._age] = value; }
    //-------------------------------------
    //getters and setters
    //-------------------------------------
    get sex() { return this._sex; }
    set sex(value) { [this._sex] = value; }
    //-------------------------------------
    // methods
    //-------------------------------------
    consolePerson() {
        console.log(
            `id: ${ this._id }\n` +
            `name: ${ this._name }\n` +
            `lastName: ${ this._lastName }\n` +
            `age: ${ this._age }\n` +
            `sex: ${ this._sex }\n`
        )
    }
    //-------------------------------------
    //draw table
    //-------------------------------------
    createTablePersons(persons) {
        document.write(
            `
            <table style="">
                <th>id</th>
                <th>name</th>
                <th>lastName</th>
                <th>age</th>
                <th>sex</th>
            `
            );
        for (const [index, person] of persons.entries()) {
            document.write(
                `<tr>
                    <td onClick="Person.changeProperty()" id="tdPersonId${index}">${person.id}</td>
                    <td onClick="Person.changeProperty()" id="tdPersonName${index}">${person.name}</td>
                    <td onClick="Person.changeProperty()" id="tdPersonLastName${index}">${person.lastName}</td>
                    <td onClick="Person.changeProperty()" id="tdPersonAge${index}">${person.age}</td>
                    <td onClick="Person.changeProperty()" id="tdPersonSex${index}">${person.sex}</td>
                </tr>`
            )
        }
        document.write("</table>");
    }
    //-------------------------------------
    //Event for td
    //-------------------------------------
    static changeProperty() {
        let propertyValue = prompt('Enter a new value:', 'value'); // new value from user
        document.addEventListener('click', function(event) {
            this.getElementById(event.target.id).innerHTML = propertyValue;
            this.getElementById(event.target.id).style.backgroundColor = 'grey';
            this.getElementById(event.target.id).style.color = 'white';
        });
    }
}

const person = new Person(1, 'Alex', 'LastAlex', 15);
person.consolePerson();
//-------------------------------------------------
// create table persons
//-------------------------------------------------
let persons = [
    new Person(1, 'Liam', 'Olivia', 25, false),
    new Person(2, 'Noah', 'Emma', 42, true),
    new Person(3, 'Oliver', 'Charlotte', 13, true),
    new Person(4, 'Elijah', 'Amelia', 25, true),
    new Person(5, 'James', 'Ava', 37, false),
    new Person(6, 'William', 'Sophia', 20, false),
    new Person(7, 'Benjamin', 'Isabella', 35, true),
    new Person(8, 'Alex', 'Smith', 25, true),
    new Person(9, 'Henry', 'Evelyn', 58, false),
    new Person(10, 'Theodore', 'Harper', 28, true)
];
person.createTablePersons(persons);