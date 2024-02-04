/* Notes */
// `this` is the Window object for DOM, it has a `document` property filled with junk

// let theDocument = document;     /* same as this.document */
/* `document` has properties
 * all, all.length,                     -- returns an HTMLCollection including all document objects, can be casted as Array.from(document.all)
 * body
 * head
 * location, location.name, location.hostname, location.port
 * URL
 * scripts
 * links, .className, .classList
 * forms
 * */


// Choosing an element
const header = document.querySelector('h3');
const html = document.querySelector('html');
const input = document.querySelector('#something');
const form = document.querySelector('form');
const para = document.querySelector('p');

const controller = new AbortController();

function randomColor()  {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}
function changeBackground(event)  {
    event.target.style.backgroundColor = randomColor();
}


// Event listener
header.addEventListener("click", () => {header.style.color = randomColor();}, {signal: controller.signal}) /* 3rd argument: events can be removed by passing an abort signal */
header.addEventListener("click", changeBackground);
header.onmouseover = () => {header.style.color = randomColor();} /* Objects (such as buttons) that can fire events also usually have properties whose name is on followed by the name of the event. */

html.onkeydown = (event) => {header.textContent = `You pressed ${event.key}`;} /* What the fuck */

form.addEventListener("submit", (event) => {
    if (input.value == "") {
        event.preventDefault()
        para.textContent = "Write something."
    }
});
/* Removing event listener */
header.removeEventListener("click", changeBackground)
controller.abort()


// Bubbling
// See [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#bubbling_example)
// See event.stopPropagation()


// Prototype
/* The property of an object that points to its prototype is not called prototype. Its name is not standard,
 * but in practice all browsers use __proto__. The standard way to access an object's prototype is the Object.getPrototypeOf() method. */


// Promises and Fetch API
/* Sending a request */
const aJsonLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
const fetchPromise = fetch(aJsonLink);    /* a promise object */

console.log("Started request...")
fetchPromise.then( (response) => {
    console.log(response.status);
});

fetchPromise.then( (response) => response.json().then(  /* We want to get the json */
    (data) => console.log(data) ));
/* But this is a callback hell */
/* .then() returns an object which the given function as an argument returns */

fetchPromise.then( (response) => response.json() )
    .then( (data) => console.log(data) )
    .catch( (error) => console.error(error) );  /* If there is an error, catch it */

/* Using Promise.all() for multiple promises on the hood, treats like and (&&), for or (||) use Promise.any() */
const fetchPromise1 = fetch(aJsonLink);
const fetchPromise2 = fetch(aJsonLink);
const fetchPromise3 = fetch(aJsonLink);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => responses.forEach((response) => console.log(response.url + ":" + response.status)))
    .catch((error) => console.error(error));

/* async and await */
async function fetchProducts()  {
    try  {
        const response = await fetch(aJsonLink);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    }
    catch (error)  {
        console.error(`Could not get products: ${error}`);
    }
}
/* async functions always return a promise */
/* you can only use await inside an async function, unless your code is in a javascript module */
/* (i) Keep in mind that just like a promise chain, await forces asynchronous operations to be completed in series.
 * This is necessary if the result of the next operation depends on the result of the last one, but if that's not the
 * case then something like Promise.all() will be more performant. */


// Implementing a promise base API
/* The Promise() constructor takes a single function as an argument (executor). When you create a new promise you supply the implementation of the executor.
 * This executor function itself takes two arguments, which are both also functions, and which are conventionally called resolve and reject.
 * In your executor implementation, you call the underlying asynchronous function. If the asynchronous function succeeds, you call resolve,
 * and if it fails, you call reject. If the executor function throws an error, reject is called automatically. You can pass a single
 * parameter of any type into resolve and reject. */
function alarm(who, delay) {
    return new Promise( (resolve, reject) => {
        if (delay < 0) reject("Alarm delay must be positive");
        setTimeout(() => {resolve(`Ring, ${who}!`);}, delay);
    });
}
/* lets use it */
alarm("Arvo", 3000).then( (message) => console.log(message) ).catch( (error) => console.error(error) );
/* Since alarm() returns a Promise, we can do everything with it that we could do with any other promise: promise chaining, Promise.all(), and async / await. */
