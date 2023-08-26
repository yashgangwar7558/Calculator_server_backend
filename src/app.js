const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require("../src/db/conn");

const app = express();
const port = process.env.PORT || 8000;

// to allow express to handle/use JSON data
app.use(express.json()); 
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', async (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Server is live at port no. ${port}`);
})