const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // You can change this port number

// const basic_ajax = path.join(__dirname, '/learn/basic-ajax/');
// const http_requests_ajax = path.join(__dirname, '/learn/http-requests-ajax/');
// const fetch_promise = path.join(__dirname, '/learn/fetch-promise-async/');
const yandex = path.join(__dirname, '/do/yandex-translate/');


app.use(express.static(yandex)); // Serve static files from the public directory

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

