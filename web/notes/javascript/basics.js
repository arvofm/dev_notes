/*
 * ALL BEFOREHAND
 * Do not run this module, this is only a note file.
 * */

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
let o_name = Symbol("propname");    /* symbols are one-and-only property names, never returns the same value twice */
obj[o_name] = "Abigail";            /* define a property with a symbol name */

let sym1 = Symbol.for("shared");        /* always returns the same value when called with the same string */
let sym2 = Symbol.for("shared");
console.log(sym1 == sym2);              /* true */
console.log(Symbol.keyFor("shared"));   /* "shared" */



// Reference
let array1 = [];
let array2 = array1;                /* assigning an object (or array) to a variable simply assigns the reference */
let array3 = Array.from(array1);    /* copy from array1, create a new array, and assign it to array3 */
array2[0] = 1;
console.log(array1[0]);             /* 1 */
console.log( array1 === array2 );   /* true, but array1 !== array3 */



// Conditional Property Access
let a = { b: null };
a.b?.c?.d                            /* => undefined */



// For/of loops
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9], sum = 0;
for(let element of data)            sum += element;                 /* sum => 45 */

obj = { x: 1, y: 2, z: 3 }, keys = pairs = ""; sum = 0;
for(let k of Object.keys(o))            keys += k;                  /* keys => "xyz" */
for(let v of Object.values(o))          sum += v;                   /* sum => 6 */
for(let [k, v] of Object.entries(o))    pairs += k + v;             /* pairs => "x1y2z3" */



// Objects
let o = { x: 0, y: 0, toString: function() {return `(${this.x}, ${this.y})`;} };
o = new Object();                           /* create an empty object: same as {}. */
o = Object.create(Object.prototype);        /* o is like {} or new Object(). */
let o1 = Object.create({x: 1, y: 2});       /* o1 inherits properties x and y. */
let o2 = Object.create(null);               /* o2 inherits no props or methods. */
o.edition = 7;                              /* create an "edition" property of o. */
o["main title"] = "ECMAScript";             /* change the "main title" property. */
let point = {
    x: 3,
    y: 4,
    valueOf() { return Math.hypot(this.x, this.y); }
};
if (point == 5)             console.log("yes, actually point is 3 4 *5*");

/// Inheritance
o = {};                 /* o inherits object methods from Object.prototype */
o.x = 1;
let p = Object.create(o);   /* p inherits properties from o and Object.prototype */
p.y = 2;
let q = Object.create(p);   /* q inherits properties from p, o, and Object.prototype */
console.log(q.x + q.y);     /* => 3 */

/// Testing the existance of properties
if ("x" in q)                                           console.log("x is an inherited property of q, false");
if (o.hasOwnProperty("x"))                              console.log("x is an own property of o, true");
if (Object.prototye.propertyisEnumerable("toString"))   console.log("false, not enumerable, same as for/in")

/// Guard against enumerating inherited properties, add explicit checks:
for(let p in o) {
    if (!o.hasOwnProperty(p)) continue;       /* skip inherited properties */
}
for(let p in o) {
    if (typeof o[p] === "function") continue; /* skip all methods */
}

/// Copying properties of one object to another:
let target = {x: 1}, source = {y: 2, z: 3};
for (let key of Object.keys(source))    target[key] = source[key];  /* target => {x: 1, y: 2, z: 3} */

/// Serializing objects
o = {x: 1, y: {z: [false, null, ""]}};
let s = JSON.stringify(o);                  /* s == '{"x":1,"y":{"z": [false,null,""]}}' */
p = JSON.parse(s);                      /* p == {x: 1, y: {z: [false, null, ""]}} */

/* JSON.stringify() method looks for a toJSON() method on any object it is asked to serialize */
point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; },
    toJSON: function() { return this.toString(); }
};
JSON.stringify([point])                     /* => '["(1, 2)"]' */

/// Spread operator
let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };
let rect = { ...position, ...dimensions };
rect.x + rect.y + rect.width + rect.height      /* => 175, spread operator only spreads the own properties, not any inherited ones */

/// Getters and setters
p = {
    x: 3.0, y: 4.0,
    /* now, where r is a read-write accessor property, */
    get r() { return Math.hypot(this.x, this.y) },
    set r(R) {
        let oldR = Math.hypot(this.x, this.y);
        let ratio = R / oldR;
        this.x *= ratio;    this.y *= ratio;
    },
    get theta() { return Math.atan2(this.y, this.x) }   /* theta is a read-only accessor property */
}
p.r = 10;
console.log(p.x);

/*
* Object.keys() returns an array of the names of the enumerable own properties of an object.
* Object.getOwnPropertyNames() works like Object.keys() but returns an array of the names of
  non-enumerable own properties as well, as long as their names are strings.
*/



// Arrays
/* When the Array() constructor function is invoked with one numeric argument, it uses that argument as an array length. But when invoked
with more than one numeric argument, it treats those arguments as elements for the array to be created. */
let original_array = [];                            /* array literals can contain object literals or other array literals */
original_array = new Array();
original_array = new Array(10);                     /* array with a length 10 */
let filled_array = [1, true, "asd", null, ];
let whatever_array = [0, ...original_array, 4];     /* => [0, 4] */
let copy_array = [...original_array];               /* a way to copy an array */
copy_array = Array.from(original_array);            /* another way to copy an array */
let digits = [..."0123456789ABCDEF"];               /* => ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"] */

/// Array Manipulation
let array = []; let sparse = [];
array.push(1);              /* adds, returns new length */
array.push(2, 3);           /* add 1, then 2 */
array.unshift(0);           /* insert new elements at the beginning, returns new length */
array.pop();                /* delete the last element of the array and return it */
let dense = sparse.filter(() => true);          /* filter() skips missing elements, to close the gaps, do this */

/// Iterating on Arrays
let letters = [..."I hope suckers suck less"];

for (let letter of letters)
    console.log(letter);

for (let [index, letter] of letters.entries())
    console.log(letter + " = " + letters[index]);

letters.forEach(letter => {
    console.log(letter);
});
letters.forEach(function(v, i ,a) {a[i] = v + 1;})            /* invokes your function with three arguments: the value, the index, and the array itself */
letters.map(x => x*x);                      /* passes each element on which it is invoked to the function you specify and returns an array from them */
letters.filter(x => x > "s")                /* returns an array containing a subset of the elements of the array on which it is invoked */
letters.find(x => x == "h");                /* returns the first matching element */
letters.findIndex(x => x == "h");           /* returns th index of first matching element */
letters.join();                             /* => "1,2,3" converts all the elements of an array to string and concatenates them */
letters.join(" ");                          /* => "1 2 3" */



// functions
function Factorial(n) {
    return n < 2 ? 1 : n * Factorial(n-1);
}
let SquareIt = function(x) {return x*x;}(10);       /* a function invoked immediately */
const sumOfTwo = (x, y) => {return x + y};
sumOfTwo = (x, y) => x + y;                         /* if the body of the function is a single return statement, omit return */
SquareIt = x => x*x;                                /* if the function has only 1 prameter, omit parantheses */
const Greet = () => console.log("Hello there!");    /* function with no arguments */
const AnObject = x => {return {value: x};};         /* if you return an object, use {} inside (): ({...}); */
/* (i) when a function gets called with less arguments, other parameters of the fuction will be assigned to undefined */
function GetPropertyNames(obj, arr = []) {          /* set default value for function parameters */
    for (let property in obj) arr.push(property);
    return arr;
}
function WhosMax(first=-Infinity, ...rest) {        /* can be invoked with an arbitrary number of arguments */
    let max = first;
    for (let n of rest)
        if (n > max) max = n;
    return max;
}
function AnotherWhosMax(x) {                        /* old ...rest technique, don't use it */
    let max = -Infinity;
    for (let i = 0; i < arguments.length; i++)
        if (arguments[i] > max) max = arguments[i];
    return max;
}
/*
(i) function parameters can be destructed, and functions can be defined with parameter defaults with destructed parameters
(i) in javascript, functions themselves can be treated as an object or array
(i) functions have properties: .name .length .prototype
*/
WhosMax.call(obj, 3, 2, 1);
WhosMax.apply(obj, [3, 2, 1]);      /* apply() is like call(), except that the arguments passed are specified in an array */

function needsToBeBound(x) { return x + this.y };       /* this function needs to be bounded to an object */
let OkeyBound = needsToBeBound.bind(obj);               /* OkeyBound is a new function that is bound */

/* the process of functions caching their previously computed results are called memoization */
function memoize(func) {        /* return a memoized version of func, only works if arguments of func all have distinct string representations */
    const cache = new Map();    /* value cache stored in the closure */
    return function(...args) {
        let key = args.length + args.join("+");     /* create a string version of the arguments to use as a cache key */
        if (cache.has(key)) return cache.get(key);
        else {
            let result = func.apply(this, args);
            cache.set(key, result);
            return result;
        }
    };
}



// classes
/* (i) class declarations are not hoisted like function declarations */
/// old-style class
range.methods = {                           /* a prototype object defines methods inherited by all range objects */
    includes(x) {
        return this.from <= x && x <= this.to;
    },
    *[Symbol.iterator]() {                  /* make instances of the class iterable */
        for (let x = Math.ceil(this.from); x <= Math.floor(this.to); x++)
            yield x;
    },
    toString() {
        return "( " + this.from + " ... " + this.to + " )";
    }
};
function range(from, to) {                  /* a factory function that returns a new object */
    let r = Object.create(range.methods);
    r.from = from;
    r.to = to;
    return r;
}
let Range = range(2, 6);                            /* finally create an object, where it behaves as a class */
console.log(Range.includes(5));                     /* true */
console.log(Range.toString());                      /* => "( 2 ... 6 )" */
console.log([...Range]);                            /* => [2, 3, 4, 5, 6] */
console.log(range.methods.isPrototypeOf(Range))     /* => true */

/// modern class
class Dot {
    #Name = "A Dot";         /* A property intialized, and it is private by the use of # */
    /* you cannot just use this.#Name = "..." in the constructor of a class unless you declare the field directly in the class body */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    GoX(dx) { this.x += dx; }
    GoY(dy) { this.y += dy; }
    get Name() { return this.#Name; }       /* getter function */
    set Name(name) { this.#Name = name; }   /* setter function */
    static CreateLine(dot1, dot2) {     /* static methods are defined as properties of the constructor function, rather than properties of the prototype object */
        return class line {
            constructor() {
                this.A = dot1;
                this.B = dot2;
            }
        };
    }
    toString() {
        return "Snake is on (", this.x, ", ", this.y, ").";
    }
}
let TheDot = new Dot(2, 5);
TheDot.GoX(2);
console.log(TheDot);

/// where JS is weird
let Square = class { constructor(x) { this.area = x * x; } };   Square;

/// subclasses, inheritence
//// old-style inheritance
function Line (dot1, dot2) {        /* a constructor function for our subclass */
    this.dot1 = dot1;
    this.dot2 = dot2;
}
Line.prototype = Object.create(Dot.prototype);  /* line prototype inherits fron dot */
Line.prototype.constructor = Line;              /* dont want to inherit Dot.prototype.constructor, so we define our own */
Line.prototype.toString = function() {}         /* override toString */
//// modern inheritance
class AnArray extends Array {
    constructor(...args) {
        super(...args);                         /* initialize Array class with its own constructor */
    }
    get first() { return this[0]; }
    get last() { return this[this.length-1]; }
}
let anArr = new AnArray();
anArr.push(1, 2, 3, 4);                     /* and so on... */
console.log(Array.isPrototypeOf(anArr));    /* => true */



// Modules
/// do-it-yourself modules with classes, objects, and closures
const stats = ( function() {        /* This is how we could define a stats module */
    const sum = (x, y) => x + y;
    const square = (x) => x * x;
    function mean (data) { return data.reduce(sum)/data.length; }
    function stddev (data) { let m = mean(data); return Math.sqrt(data.map(x => x - m).map(square).reduce(sum)/(data.length-1)); }
    return {mean, stddev};          /* Export the public functions as properties of an object, so stat is somewhat a modeule */
}());
console.log(stats.mean([1, 3, 5, 7, 9]));           /* => 5 */
console.log(stats.stddev([1, 3, 5, 7, 9]));         /* => Math.sqrt(10) */

/// modules in node
exports.mean = data => data.reduce(sum) / data.length;  /* node defines a global exports object */
const fs = require("fs");                               /* a node module imports another by using require() */
const fun = require("./fun.js");                        /* own files importion */
/* until then, this was all an unofficial way to use modules, here it comes now */

/// modules in ES6
export class Circle {               /* to export anything from an ES6 module: */
    constructor(r) { this.r = r };
    area()  {
        return Math.PI * this.r * this.r;
    }
}
export default stats;                               /* when there is only one thing to export, use `export default` */
export {cool} from "./cool.js"                      /* re-export cool */
import web from "./basics.js";                      /* simple */
import {web3, web1, web2} from "./internet.js";     /* multiple modules */
import * as wtf from "./wtf";                       /* each of non-default exports of the module being imported becomes a property of this wtf object */ wtf;
import { default as Histogram, mean, stddev } from "./histogram-stats.js";      /* importing default */
import { setTimeout } from "timers";



// JS Standard Library

/// sets
let myset = new Set();          /* a set is a collection of values like arrays, unlike arrays, sets are not ordered or indexed, and they do not allow duplicates */
let thyset = new Set([1, myset]);   /* a set with two numbers */
thyset = new Set(myset);            /* a set that copies the elements of myset */
/* COMMON PROPERTIES: .size .add() .delete() .clear() .has() */
/* set membership is based on strict equality checks, === */
/* set class is iterable by using a for/of loop, or deconstructable by ... */

/// maps
let mymap = new Map();          /* [k ,v], you know */
let thymap = new Map([[1, "x"], [2, "y"]]);
thymap = new Map(mymap);    /* a new map with same keys and values as mymap */
for (let [K, V] of thymap)  /* iteration on a map */
    console.log(K, ": ", V);
/* COMMON PROPERTIES: .size .set() .get() .has() .delete() .clear() .keys() .values() .entries() */

/// WeakMap and WeakSet
/* keys must be objects or arrays, primitive values are not subject to garbage collection and cannot be used as keys
* does not implement .size, because the size can change during the garbage collection, wtf
* much faster */

/// typed arrays
/* elements of a typed array are all numbers
 * length of a typed array must be specified, and can never be chaged
 * the elements are initialized to 0 when the array is created 
 * faster, use them */
/* Some useful typed arrays:
*/ Int8Array(); Uint8Array(); Int16Array(); Int32Array(); BigInt64Array(); BigUint64Array(); Float32Array(); Float64Array();
/* We can also allocate memory by passing the number of bytes to ArrayBuffer class */
let arrBuffer = new ArrayBuffer(1024);              /* does not allow read or write, but can be used to create typed arrays */
console.log(arrBuffer.byteLength);                  /* => 1024; 1kB of memory */
let myTypedArray = new Int32Array(arrBuffer);
console.log(myTypedArray.length);                   /* array with a length of 256 */
/* set() method */
let maBytes = new Uint8Array(1024);                 /* a 1kB buffer */
let maPattern = new Uint8Array([0, 1, 2, 3]);       /* an array of 4 bytes */
maBytes.set(maPattern);                             /* copy pattern to the start of maBytes */
maBytes.set(maPattern, 4);                          /* copy pattern in different offset */
maBytes.set([0, 1, 2, 3], 8);                       /* or just direct from a regular array */
console.log(maBytes.slice(0, 12));                  /* => new Uint8Array([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]) */
let subMaBytes = maBytes.subarray(maBytes.length-3, maBytes.length);
console.log(subMaBytes);                            /* => [1, 2, 3] */
console.log(subMaBytes.buffer === maBytes.buffer);  /* => true; both are views of the same buffer */
/* slice() returns the specified elements in a new, independent typed array whih does not share memory with the original array;
 * subarray() does not copy any memory, it just returns a new view of the same memory, useful for reading */
console.log(maBytes.length * maBytes.BYTES_PER_ELEMENT === maBytes.byteLength);     /* => true */

/// more and more about typed arrays
/* assume we have a typed array of bytes of binary data to process. first, we create a DataView object so we can read and write values from those bytes */
let view = new DataView(maBytes.buffer, maBytes.byteOffset, maBytes.byteLength);
let maBite = view.getUint8(0);                      /* read big-endian unsigned bytes from byte 0 offset */
maBite = view.getUint8(1, false);                   /* next byte is also big-endian */
maBite = view.getUint8(2, true);                    /* next byte is little-endian */
view.setUint8(3, maBite, true);                     /* write it back in little-endian format */
/* view.getASD(byte-offset, big/little-endian) */   /* false: big-endian    true: little-endian */
/* view.setASD(byte-offset, variable-to-write, big/little-endian) */
/* these give you all the tools to process binary data */

/// date
let now = new Date();               /* Date object */
function benchmark(func) {
    return function (...args) {
        let startTime = Date.now();
        try  { return func(...args); }
        finally { console.log(`Exiting ${func.name} after ${Date.now() - startTime}ms.`); }
    }
}

/// errors
class HTTPError extends Error  {
    constructor (status, message, url) {
        super(`${status} ${message}: ${url}`);
        this.status = status; this.message = message; this.url = url;
    }
    get name()  {
        return "HTTP Error";
    }
}

/// console API
/* console methods
 * console.debug() console.info() console.warn() console.error()    (i) error() sends message to stderr
 * console.assert() console.clear() console.table() console.trace()                                         */

/// URL APIs
let url = new URL("https://example.com:8000/path/name?q=term#fragment");    /*
* url.href              => "https://example.com:8000/path/name?q=term#fragment"
* url.origin            => "https://example.com:8000"
* url.protocol          => "https:"
* url.host              => "example.com:8000"
* url.hostname          => "example.com"
* url.port              => "8000"
* url.pathname          => "/path/name"
* url.search            => "?q=term"
* url.hash              => "#fragment"                                      */

/// Timers
setTimeout(() => {console.log("Waiting 5 seconds to pass")}, 5000);     /* setTimeout(function, delay) */
/* Both setTimeout() and setInterval() return a value. If you save this value in a variable, you can then use it later to cancel the
execution of the function by passing it to clearTimeout() or clearInterval().                                                        */
function wtfClock() {           /* once a second, clear the console and print the current time */
    function logTime() {
        console.clear();
        console.log(new Date().toLocaleString());
    }
    let clock = setInterval(logTime, 1000);                  /* invokes the function repeatedly every time the specified number of milliseconds have elapsed. */
    setTimeout(() => { clearInterval(clock) }, 20000);
}



// Iterators and Generators
/* iterator method of an interable object does not have a conventional name, but uses Symbol.iterator as its name.  */
let iterable = new Array(99);
let iterator = iterable[Symbol.iterator]();
for (let result = iterator.next(); !result.done; result = iterator.next())      /* hard way of writing for/of loop  */
    console.log(result.value);
/* the iterator object of the built-in iterable datatypes is itself iterable                                        */
let maList = [0, 1, 2, 3, 4];
let iter = maList[Symbol.iterator]();
console.log(iter.next().value);                 /* => 0                                                             */
console.log([...iter]);                         /* => [1, 2, 3, 4]                                                  */

/// implementing iterable objects
/* in order to make class iterable, you must implement a method whose name is `Symbol.iterator`. That method must
 * return an iterator object that has a next() method, and the next() method must return an iteration result object that
 * has a `value` property and a boolean done property. */
class BetterRange  {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    toString()      { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`;                   }
    has()           { return typeof x == "number" && this.from <= x && x <= this.to;    }
    [Symbol.iterator]() {
        let now = Math.ceil(this.from);             /* a state variable to track location */
        let last = this.to;                         /* inevitable */
        return {
            next() {                                /* return iterator object */
                return (now <= last) ? {value: now++, done: false} : {done: true};
            },
            [Symbol.iterator]() { return this; }    /* as a convenience, we make the iterator itself iterable */
        };
    }
}
console.log([...(new BetterRange(-2, 2))]);

/// generators
function *oneDigitPrimes() {                /* this can be used in classes or objects */
    yield 2; yield 3; yield 5; yield 7;
}
let primes = oneDigitPrimes();
while (!primes.next().done)
    console.log(primes.next().value);       /* => 2, 3, 5, 7 */
console.log([...oneDigitPrimes()]);         /* => [2, 3, 5, 7] */

/// generator example
function *fibonacci() {
    let x = 0, y = 1;
    while (1) {
        yield y;
        [x, y] = [y, x+y];
    }
}
function *take(n, iterable) {       /* yield the first n elements of the given iterable */
    let it = iterable[Symbol.iterator]();
    while (n-- > 0) {               /* loop n times */
        let next = it.next();       /* get the next item from the iterator */
        if (next.done) return;      /* if there are no more values, return */
        else yield next.value;      /* otherwise, yield the value */
    }
}
console.log([...take(20, fibonacci())]);        /* print fibonacci until the 20th number of that series */
/* what explained are only the basic methods, learn more about generators elsewhere */




