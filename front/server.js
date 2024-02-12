// Example server.js file
const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // You can change this port number

const thePath = path.join(__dirname, '/');
// const canvas = path.join(__dirname, '/canvas/');


app.use(express.static(thePath)); // Serve static files from the public directory

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
