/* FUN */

// Compare two arrays
function equalArrays(a, b) {
    if (a === b) return true;                   // Identical arrays are equal
    if (a.length !== b.length) return false;    // Different-size arrays not equal
    for(let i = 0; i < a.length; i++)           // Loop through all elements
        if (a[i] !== b[i]) return false;        // If any differ, arrays not equal
    return true;
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
