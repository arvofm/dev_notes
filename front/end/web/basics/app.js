/* Notes */
// `this` is the Window object for DOM, it has a `document` property filled with junk

// let theDocument = document;     /* same as this.document */
/* `document` has properties
 * all, all.length,                     -- returns an HTMLCollection including all document objects, can be casted as Array.from(document.all)
 * body
 * head
 * location, location.name, location.hostname, location.port
 * URL
 * scripts, .length                 Arraylike object
 * links, .className, .classList
 * forms
 * */


// Choosing an element
/* .getElementByClassName("class")     => returns an arraylike obj */
/* .getElementByTagName("tag")         => returns an arraylike obj */
const input = document.getElementById("something");
const header = document.querySelector('h3');
const body = document.querySelector('body');
const html = document.querySelector('html');
const form = document.querySelector('form');
const para = document.querySelector('p:last-child');
const paras = Array.from(document.querySelectorAll('p'));
const everybody = body.childNodes;      /* counts spaces (\n), dont use it */
everybody = body.children;              /* use this */
everybody[0] = everybody[1].previousSibling;
everybody[1] = everybody[0].nextSibling;
body = everybody[0].parentElement;

const controller = new AbortController();

function randomColor()  {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
}
function changeBackground(event)  {
    event.target.style.backgroundColor = randomColor();
}

// DOM Basics
const newPara = document.createElement('p');
newPara.textContent = 'I was created by JS';
newPara.classList.add("newClassHello");
newPara.classList.remove("newClassHello");
body.appendChild(newPara);                                          // Behaves like mv or move; if you want to copy do Node.removeChild()
body.appendChild(document.createTextNode("Hello there..."));
body.removeChild(newPara)               // remove newPara
newPara.remove();                       // new version
newPara.parentNode.removeChild(newPara) // old version
body.replaceChild(newElement, oldElement);              /* I know */

// Styling more
newPara.setAttribute("class", "cool");
newPara.hasAttribute("class");                                  /* true / false */
let classNewPara = newPara.getAttribute("class");
newPara.textContent = "A text to display"                       /* this removes everything and adds the new value, >, dont use this */
newPara.innerHTML = "<p> Why? </p>"



// Event listener
/* Some events:
 * keydown, keypress, keyup
 * mousedown, mouseup, mouseover, mouseout, mouseenter, mouseleave, click, dblclick
 * DOMContentLoaded
 * focus, blur                          // enter, exit
 * copy, paste, select
 * */
header.addEventListener("click", () => {header.style.color = randomColor();}, {signal: controller.signal}) /* 3rd argument: events can be removed by passing an abort signal */
header.addEventListener("click", changeBackground);
header.onmouseover = () => {header.style.color = randomColor();} /* Objects (such as buttons) that can fire events also usually have properties whose name is on followed by the name of the event. */
html.onkeydown = (event) => {header.textContent = `You pressed ${event.key}`;} /* What the fuck */
/* or use keypress */

form.addEventListener("submit", (event) => {
    if (input.value == "") {
        event.preventDefault()
        para.textContent = "Write something."
        console.log(event.target);
    }
});
/* Removing event listener */
header.removeEventListener("click", changeBackground)
controller.abort()


// Bubbling
// See [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#bubbling_example)
// See event.stopPropagation()


// Session Storage
/* .key() .clear() .setItem() .getItem() .removeItem() .length . */
sessionStorage.setItem("key", "value");


// Local Storage
/* .key() .clear() .setItem() .getItem() .removeItem() .length . */
localStorage.setItem("key", "Item");
/* (!) WARNIN: USE STORAGE WITH JSON.stringify() AND JSON.parse() */


// Time
setTimeout(() => { console.log("Works after 1 second after reload") }, 1000);

let timer = setInterval(() => { console.log("Works every 1 second") }, 1000);

clearInterval(timer);       /* stop timer */



















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
