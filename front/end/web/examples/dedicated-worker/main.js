const worker = new Worker('./generate.js');

document.querySelector("#generate").addEventListener("click", (event) => {
    const quota = document.querySelector("#quota").value;
    worker.postMessage( { command: "generate", quota } );
});

worker.addEventListener("message", (event) => {
    document.querySelector("#output").textContent = "Finished generating "+event.data+" primes.";
});

document.querySelector("#reload").addEventListener("click", () => {
  document.querySelector("#user-input").value =
    'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});

/*
    * First, we're creating the worker using the Worker() constructor. We pass it a URL pointing to the worker script.
    As soon as the worker is created, the worker script is executed.
    * Next, as in the synchronous version, we add a click event handler to the "Generate primes" button. But now, rather
    than calling a generatePrimes() function, we send a message to the worker using worker.postMessage(). This message
    can take an argument, and in this case, we're passing a JSON object containing two properties:
        command: a string identifying the thing we want the worker to do (in case our worker could do more than one thing)
        quota: the number of primes to generate.
    * Next, we add a message event handler to the worker. This is so the worker can tell us when it has finished, an
    pass us any resulting data. Our handler takes the data from the data property of the message, and writes it to
    the output element (the data is exactly the same as quota, so this is a bit pointless, but it shows the principle).
    * Finally, we implement the click event handler for the "Reload" button. This is exactly the same as in the synchronous version.
 */
