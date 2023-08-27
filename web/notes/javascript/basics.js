/* Some info
## `Math` object has the methods of:
pow(), round(), ceil(), floor(), abs(), max(), min(), random(), sqrt(), PI, E

## `Number` object has the methods of:
POSITIVE_INFINITY, NEGATIVE_INFINITY, isNaN(), isFinite(), isInteger()

## String objects have the methods of:
slice(), split(), indexOf(), lastIndexOf(), startsWith(), endsWith(), includes(), charAt(), trim(), concat()

## Explicit Type Conversions
Boolean([])         => true
String(false)       => "false"
Number("3")         => 3

## Object To Primitive Conversions
(i) All objects convert to true

## Destruction
let [x, ...y] = [1,2,3,4];                          // y == [2,3,4]
let transparent = {r: 0.0, g: 0.0, b: 0.0, a: 1.0};     // An RGBA color
let {r, g, b} = transparent;                            // r == 0.0; g == 0.0; b == 0.0

## Conditionals
o.m()                   // Regular property access, regular invocation
o?.m()                  // Conditional property access, regular invocation
o.m?.()                 // Regular property access, conditional invocation

## "in" Keyword
let point = {x: 1, y: 1};
"x" in point               // => true: object has property named "x"
"z" in point               // => false: object has no "z" property.
"toString" in point        // => true: object inherits toString method
let data = [7,8,9];
"0" in data                // => true: array has an element "0"
3 in data                  // => false: no element 3

## "instanceof" Keyword
let d = new Date();
d instanceof Date               // => true: d was created with Date()
d instanceof Object             // => true: all objects are instances of Object
d instanceof Number             // => false: d is not a Number object

(i) Objects are not compared by value: two distinct objects are not equal, even if they have the same properties and values.
(i) Two distinct arrays are not equal even if they have the same elements in the same order.
(i) The delete operator only deletes own properties, not inherited ones.
(i) Attempting to delete a non-configurable property evaluates to false.
*/



// Symbols
let obj = {};
let o_name = Symbol("propname");    // symbols are one-and-only property names, never returns the same value twice
obj[o_name] = "Abigail";            // define a property with a symbol name

let sym1 = Symbol.for("shared");        // always returns the same value when called with the same string
let sym2 = Symbol.for("shared");
console.log(sym1 == sym2);              // true
console.log(Symbol.keyFor("shared"));   // "shared"



// Reference
let array1 = [];
let array2 = array1;                // assigning an object (or array) to a variable simply assigns the reference
let array3 = Array.from(array1);    // copy from array1, create a new array, and assign it to array3
array2[0] = 1;
console.log(array1[0]);             // 1
console.log( array1 === array2 );   // true, but array1 !== array3



// Conditional Property Access
let a = { b: null };
a.b?.c?.d                            // => undefined



// For/of loops
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9], sum = 0;
for(let element of data)            sum += element;                 // sum => 45

obj = { x: 1, y: 2, z: 3 }, keys = pairs = ""; sum = 0;
for(let k of Object.keys(o))            keys += k;                      // keys => "xyz"
for(let v of Object.values(o))          sum += v;                      // sum => 6
for(let [k, v] of Object.entries(o))    pairs += k + v;               // pairs => "x1y2z3"



// Objects
let o = { x: 0, y: 0, toString: function() {return `(${this.x}, ${this.y})`;} };
o = new Object();                           // create an empty object: same as {}.
o = Object.create(Object.prototype);        // o is like {} or new Object().
let o1 = Object.create({x: 1, y: 2});       // o1 inherits properties x and y.
let o2 = Object.create(null);               // o2 inherits no props or methods.
o.edition = 7;                              // create an "edition" property of o.
o["main title"] = "ECMAScript";             // change the "main title" property.
let point = {
    x: 3,
    y: 4,
    valueOf() { return Math.hypot(this.x, this.y); }
};
if (point == 5)             console.log("yes, actually point is 3 4 *5*");

/// Inheritance
o = {};                 // o inherits object methods from Object.prototype
o.x = 1;
let p = Object.create(o);   // p inherits properties from o and Object.prototype
p.y = 2;
let q = Object.create(p);   // q inherits properties from p, o, and Object.prototype
console.log(q.x + q.y);     // => 3

/// Testing the existance of properties
if ("x" in q)                                           console.log("x is an inherited property of q, false");
if (o.hasOwnProperty("x"))                              console.log("x is an own property of o, true");
if (Object.prototye.propertyisEnumerable("toString"))   console.log("false, not enumerable, same as for/in")

/// Guard against enumerating inherited properties, add explicit checks:
for(let p in o) {
    if (!o.hasOwnProperty(p)) continue;       // skip inherited properties
}
for(let p in o) {
    if (typeof o[p] === "function") continue; // skip all methods
}

/// Copying properties of one object to another:
let target = {x: 1}, source = {y: 2, z: 3};
for (let key of Object.keys(source))    target[key] = source[key];  // target => {x: 1, y: 2, z: 3}

/// Serializing objects
o = {x: 1, y: {z: [false, null, ""]}};
let s = JSON.stringify(o);                  // s == '{"x":1,"y":{"z": [false,null,""]}}'
p = JSON.parse(s);                      // p == {x: 1, y: {z: [false, null, ""]}}

/// JSON.stringify() method looks for a toJSON() method on any object it is asked to serialize
point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; },
    toJSON: function() { return this.toString(); }
};
JSON.stringify([point])                     // => '["(1, 2)"]'

/// Spread operator
let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };
let rect = { ...position, ...dimensions };
rect.x + rect.y + rect.width + rect.height      // => 175, spread operator only spreads the own properties, not any inherited ones

/// Getters and setters
p = {
    x: 3.0, y: 4.0,
    // now, where r is a read-write accessor property,
    get r() { return Math.hypot(this.x, this.y) },
    set r(R) {
        let oldR = Math.hypot(this.x, this.y);
        let ratio = R / oldR;
        this.x *= ratio;    this.y *= ratio;
    },
    get theta() { return Math.atan2(this.y, this.x) }   // theta is a read-only accessor property
}
p.r = 10;
console.log(p.x);

/*
* Object.keys() returns an array of the names of the enumerable own properties of an object.
* Object.getOwnPropertyNames() works like Object.keys() but returns an array of the names of
  non-enumerable own properties as well, as long as their names are strings.
*/



// Arrays

