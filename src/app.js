const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); // to allow express to handle/use JSON data

app.get('/', async (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Server is live at port no. ${port}`);
})