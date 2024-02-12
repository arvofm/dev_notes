// Minimal theory of promises {{{{{{
function isEven(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number % 2 == 0) {
                resolve(number);
            } else {
                reject(new Error('Not even'));
            }
        }, 2000);
    });
}

// use promises
let input = document.querySelector("#is_even");
let submit = document.querySelector("#submit");
submit.onclick = () =>  {
    console.log(input.value);

    isEven(input.value)
    .then(response => {
        console.log("That number is even: " + response);
        return Number(response)+1;
    }).then(res1 =>  {
        /* res1 has the previous return value */
        console.log("and it's an odd number: " + res1);
    }).catch(err =>  {
        console.error(err);
    })
}
// }}}


// Fetch API {{{
class Request {
    static get(URL) {
        return new Promise((resolve, reject) => {
            fetch(URL)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    static post(URL, data) {
        return new Promise((resolve, reject) => {
            fetch(URL, {
                method: "POST",
                body: JSON.stringify(data),
                headers:  {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }
    static put(URL, data) {
        return new Promise((resolve, reject) => {
            fetch(URL, {
                method: "PUT",
                body: JSON.stringify(data),
                headers:  {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
        });
    }
    static delete(URL) {
        return new Promise((resolve, reject) => {
            fetch(URL, {
                method: "DELETE"
            })
            .then(response => resolve(true))    // true, because the returned object is empty
            .catch(err => reject(err));
        });
    }
}
/**********************************************************************/

// get
let getURL = "https://jsonplaceholder.typicode.com/posts"
let getButton = document.querySelector("#get_em");
let getOutput = document.querySelector("#get_output");

getButton.onclick = () => {
    Request.get(getURL)
    .then(response => getOutput.innerHTML = JSON.stringify(response))
    .catch(err => console.error(err));
}



// post
let postURL = "https://jsonplaceholder.typicode.com/posts"
let postButton = document.querySelector("#post_em");
let postOutput = document.querySelector("#post_output");
const postObject = {userId: 999, title: "foo", body: "bar"}

postButton.onclick = () => {
    Request.post(postURL, postObject)
    .then(response => postOutput.innerHTML = JSON.stringify(response))
    .catch(err => console.error(err));
}



// put
let putURL = "https://jsonplaceholder.typicode.com/posts/1"
let putButton = document.querySelector("#put_em");
let putOutput = document.querySelector("#put_output");
const putObject = {userId: 999, title: "foo", body: "bar"}

putButton.onclick = () => {
    Request.put(putURL, postObject)
    .then(response => putOutput.innerHTML = JSON.stringify(response))
    .catch(err => console.error(err));
}



// delete
let deleteURL = "https://jsonplaceholder.typicode.com/posts/1"
let deleteButton = document.querySelector("#delete_em");
let deleteOutput = document.querySelector("#delete_output");

deleteButton.onclick = () => {
    Request.delete(deleteURL)
    .then(response => deleteOutput.innerHTML = response ? "Deletion successful" : "Something went wrong")
    .catch(err => console.error(err));
}



// }}}


// All with async

class newRequest extends Request {
    static async get(URL) {
        const response = await fetch(URL);
        return await response.json();
    }
    static async post(URL, data) {
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers:  {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return await response.json();
    }
    static async put(URL, data) {
        const response = await fetch(URL, {
            method: "PUT",
            body: JSON.stringify(data),
            headers:  {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        return await response.json();
    }
    static async delete(URL) {
        const response = await fetch(URL, {
            method: "DELETE",
        });
        return await response.json();
    }
}

