function User(id, name) {
    //private
    var _id = id;
    var _name = name;
    //public
    return { 
        getId: () => { return _id; },
        setId: (id) => { _id = id; },
        getName: () => { return _name; },
        setName: (name) => { _name = name; },
    }; 
} 
//-----------------------------------
const user = User(1, 'Alex');
console.log(user.getName()); // Alex
//-----------------------------------
console.log(user._id) // error [undefined]