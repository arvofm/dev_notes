class Request {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    // get data
    get(url, callback) {
        this.xhr.open("GET", url, true);
        this.xhr.onload = () => {       /* an arrow function will not inherit this as this.xhr, whereas a legacy function would do */
            if (this.xhr.status === 200) {
                callback(null, JSON.parse(this.xhr.responseText));
            }
            else {
                callback("GET: Error", null);
            }
        };
        this.xhr.send();
    }

    // send data
    post(url, data, callback) {
        this.xhr.open("POST", url, true);
        this.xhr.setRequestHeader("Content-type", "application/json");      /* specify that we are sending json */

        this.xhr.onload = () => {
            if (this.xhr.status == 201)
                callback(null, JSON.parse(this.xhr.responseText));
            else
                callback("POST: Error", null);
        };

        this.xhr.send(JSON.stringify(data));
    }

    // update data
    put(url, data, callback) {
        this.xhr.open("PUT", url, true);
        this.xhr.setRequestHeader("Content-type", "application/json");

        this.xhr.onload = () => {
            if (this.xhr.status == 200)
                callback(null, JSON.parse(this.xhr.responseText));
            else
                callback("PUT: Error", null);
        };
        this.xhr.send(JSON.stringify(data));
    }

    // delete data
    get(url, callback) {
        this.xhr.open("DELETE", url, true);
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(null, "Operation Successful: Data deleted.");
            }
            else {
                callback("DELETE: Error", null);
            }
        };
        this.xhr.send();
    }

}
/******************************************************************************************************/

    // get data
let btnGet = document.querySelector("#getem");
let outputGet = document.querySelector("#get-output");
let getURL = "https://jsonplaceholder.typicode.com/users";

btnGet.addEventListener("click", () => {
    let request = new Request();
    request.get(getURL, function(err, data) {
        if (!err) {
            console.log(data);
            outputGet.innerHTML = JSON.stringify(data);
        }
        else {
            console.error(err);
            outputGet.innerHTML = err;
        }
    });
});

    // send data
let btnPost = document.querySelector("#postem");
let outputPost = document.querySelector("#post-output");
let postURL = "https://jsonplaceholder.typicode.com/posts";

btnPost.addEventListener("click", () => {
    /* in this case we send the server a post request with some object, server will handle the request and send the response text */
    let request = new Request();
    request.post(postURL, {title: "foo", body: "bar", userId: 1}, function(err, data) {
        if (!err) {
            console.log(data);
            outputPost.innerHTML = JSON.stringify(data);
        }
        else {
            console.error(err);
            outputPost.innerHTML = err;
        }
    });
});

    // update data
let btnPut = document.querySelector("#putem");
let outputPut = document.querySelector("#put-output");
let putURL = "https://jsonplaceholder.typicode.com/posts/2";        /* update /2 */

btnPut.addEventListener("click", () => {
    let request = new Request();
    request.put(putURL, {title: "foo", body: "bar", userId: 999}, function(err, data) {
        if (!err) {
            console.log(data);
            outputPut.innerHTML = JSON.stringify(data);
        }
        else {
            console.error(err);
            outputPut.innerHTML = err;
        }
    });
});

    // delete data
let btnDelete = document.querySelector("#deleteem");
let outputDelete = document.querySelector("#delete-output");
let deleteURL = "https://jsonplaceholder.typicode.com/posts/10";    /* delete /10 */

btnDelete.addEventListener("click", () => {
    let request = new Request();
    request.get(deleteURL, function(err, data) {
        if (!err) {
            console.log(data);
            outputDelete.innerHTML = data;
        }
        else {
            console.error(err);
            outputDelete.innerHTML = err;
        }
    });
});
