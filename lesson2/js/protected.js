// Declare objects within an anonymous function to limit access.
var objectRefs = (function() {
    // This is the object we want to inherit from.
    function Base(param1, _protected) {
      var _public = this;
      var _protected = _protected || {};
      var _private = {};
  
      // Declare some variables
      _public.shared = "Anyone can access this!";
      _protected.inherited = "This is protected";
      _private.secretVar = "Children cannot access this.";
  
      // Let's try a few functions.
      _public.foo = function() {
        // We can access protected and private functions here. This would
        // not be possible if we attached it to the prototype.
        console.log(_protected.inherited);
        console.log(_private.secretVar);
        _private.secret();
      };
  
      _protected.bar = function() {
        // One thing to watch out for: private functions called after
        // construction do NOT have access to the object via 'this'. This is
        // masked by the fact that I assigned it to the '_public' var.
        // More reading: https://stackoverflow.com/q/20279484/3658757
        console.log(_public.shared);
      };
  
      _private.secret = function() {
        // The same warning in _protected.bar applies here too.
        console.log(_public.shared);
      };
    }
  
    // Inherits from Base
    function Derived(param1, _protected) {
      var _public = this;
      var _protected = _protected || {};
      var _private = {};
  
      // Inherit (ready for the magic?)
      Base.call(this, param1, _protected);
  
      // Since we passed a reference to the "_protected" object as an argument
      // to the Base object, it has been attaching all of its protected
      // variables to it. We can now access those variables here:
  
      // Outputs "This is protected"
      console.log(_protected.inherited);
  
      // We can also access protected functions:
      _protected.bar();
  
      // We can even override protected variables and functions.
      _protected.inherited = "New value!";
  
      // We cannot access private variables belonging to Base.
      // This fails:
      // console.log(_private.secretVar);
    }
  
    // We don't want to allow public access to the constructors, because this
    // would let outside code pass in a '_protected' var. Instead, we create new
    // objects that accept all params minus '_protected', and inherit from the
    // target object.
    return {
      Base: function(param1) {
        Base.call(this, param1);
      },
      Derived: function(param1) {
        Derived.call(this, param1);
      }
    };
  }());
  
  // Assign the constructors to variables for clarity.
  var Base = objectRefs.Base;
  var Derived = objectRefs.Derived;
  
  // This is how you construct the object.
  var newDerived = new Derived("param1");
  
  // Public functions are accessible.
  newDerived.foo();
  
  // Protected functions are not. These fail:
  // newDerived.bar();
  // newDerived.protected.bar();