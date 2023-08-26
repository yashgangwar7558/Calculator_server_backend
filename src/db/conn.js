const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: '../../.env' });

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL || "mongodb+srv://yashgangwar:Yash12345@cluster0.vo961.mongodb.net/calculator?retryWrites=true&w=majority";

console.log(CONNECTION_URL);

if (!CONNECTION_URL) {
    console.error("Error: MONGODB_CONNECTION_URL environment variable is not set.");
} else {
    mongoose.connect(CONNECTION_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then((res) => {
        console.log("Hurray!! Successfully Connected to the database");
    }).catch((err) => {
        console.log("Connection failed to the database!!");
    });
}
