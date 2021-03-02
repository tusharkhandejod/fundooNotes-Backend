const express = require('express');
const dbConfig3 = require('./Config/config');
const AuthRoute = require('./Routes/userRoutes');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


let port = 5000;
console.log("Server js is running")


app.use(cors());
app.use(express.json());
app.use('/api', AuthRoute);
app.listen(port, () => {
    console.log(`Server is starting at port : ${port}`)
})


mongoose.connect(dbConfig3.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successfully");
}).catch(err => {
    console.log("error", err);
    process.exit();
});