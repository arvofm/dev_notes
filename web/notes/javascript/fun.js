/* FUN */

// my beloved strLen
function strLen(str) {
    let i;
    for (i = 0; str[i]; i++);
    return i;
}

// Compare two arrays
function equalArrays(a, b) {
    if (a === b) return 1;                   // Identical arrays are equal
    if (a.length !== b.length) return 0;    // Different-size arrays not equal
    for(let i = 0; i < a.length; i++)           // Loop through all elements
        if (a[i] !== b[i]) return 0;        // If any differ, arrays not equal
    return 1;
}

// Show frequencies of letters in a word
function fq(message) {
    let frequency = {};
    for(let letter of message) {
        if (frequency[letter])      frequency[letter]++;
        else                        frequency[letter] = 1;
    }
    return frequency;       // when message => "mississippi", frequency => {m: 1, i: 4, s: 4, p: 2}
}

// merge two or more objects into target object
// Like Object.assign() but doesn't override existing properties (and also doesn't handle Symbol properties)
function merge(target, ...sources) {
    for(let source of sources)
        for(let key of Object.keys(source))
            if (!(key in target))
                target[key] = source[key];
    return target;
}

// this function takes a function and returns a wrapped version
function timed(func) {  // for a function benchmark(n), use it like timed(benchmark)(100000)
    return function(...args) {
        console.log(`Entering function ${func.name}`);
        let startingTime = Date.now();
        try {
            return func(...args);
        }
        finally {
            console.log(`Exiting ${func.name} after ${Date.now() - startingTime}ms.`);
        }
    }
}

// compute factorials and cache results as properties of the function itself
function factorial(n) {
    if (n == 1) factorial[1] = 1;
    if (Number.isInteger(n) && n > 0) {
        if (!(n in factorial))
            factorial[n] = n * factorial(n-1);
        return factorial[n];
    }
    else return NaN;
}

// replace the method m of the object o with version that logs
function trace(o, m) {
    let original = o[m];
    o[m] = function (...args) {
        console.log("Entering: ", m);
        let result = original.apply(this, args);
        console.log("Exiting:", m);
        return result;
    }
    return o[m];
}

// return the logical negation of of f's return values
function not(func) {
    return function(...args) {
        return !(func.apply(this, args));
    };
}
// determine if a number is even
const even = x => x % 2 === 0;
odd = not(even);
console.log([1, 3, 5, 7].every(even));      // usage

/* return a memoized version of func, only works if arguments of func all have distinct string representations */
function memoize(func) {
    const cache = new Map();    // value cache stored in the closure
    return function(...args) {
        let key = args.length + args.join("+");     // create a string version of the arguments to use as a cache key
        if (cache.has(key)) return cache.get(key);
        else {
            let result = func.apply(this, args);
            cache.set(key, result);
            return result;
        }
    };
}

/* a version of map that implements type-checking */
class TypedMap extends Map {
    constructor(keyType, valueType, entries) {
        if (entries) {                      // if entries are specified, check their types
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType)
                    throw new TypeError("Wrong type of entry...");
            }
        }
        super(entries);     // initialize the superclass with the type-checked initial entries
        this.keyType = keyType;
        this.valueType = valueType;
    }
    set(key, value) {       // redefine the set() method to add type checking
        let isOkay = typeof key === this.keyType && typeof value === this.valueType;
        if (!isOkay)
            throw new TypeError("What the fuck?");  // throw an error if the key or value are of the wrong type
        return super.set(key, value);       // invoke, since the arguments are verified
    }
}

