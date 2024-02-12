/* HTTP STATUS
 * 200: OK
 * 403: FORBIDDEN
 * 404: NOT FOUND
 * 505: INTERNAL SERVER ERROR
 * *//*********************************************************/
/* READY STATE
0   UNSENT              Client has been created. open() not called yet.
1   OPENED              open() has been called.
2   HEADERS_RECEIVED    send() has been called, and headers and status are available.
3   LOADING             Downloading; responseText holds partial data.
4   DONE                The operation is complete.
 * */

/* Events:
 * abort, error, load, loadend, loadstart, progress, readystatechange, timeout */


/* See [XMLHTTPRequest Object](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) */

// Using a text file
document.querySelector("#text-button").addEventListener("click", (e) =>{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./text.txt", true);
    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4 && xhr.status == 200)
            console.log(xhr.responseText);
    });
    xhr.onload = () => {    /* works if xhr.readystate == 4 */
        if (xhr.status == 200)
            document.querySelector("#text").innerHTML = xhr.responseText;
    };
    xhr.send();
});

// Using a JSON
document.querySelector("#json-button").addEventListener("click", () =>{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./ajson.json", true);
    xhr.onload = () => {
        if (xhr.status == 200)
            document.querySelector("#json").innerHTML = JSON.parse(xhr.responseText);
            console.log(JSON.parse(xhr.responseText));
    }
    xhr.send()
});



