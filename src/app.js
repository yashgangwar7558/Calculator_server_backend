const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require("../src/db/conn");
const router = require('../src/routers/calculator');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(router)

app.get('/', async (req, res) => {
    const homepage = path.join(__dirname, 'index.html');
    res.sendFile(homepage);
})

app.listen(port, () => {
    console.log(`Server is live at port no. ${port}`);
})