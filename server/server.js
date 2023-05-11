const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bcrypt = require('bcryptjs');


const routes = require("./routes/FeedbackRoute");
const userRoutes = require('./routes/UserRoute');
const displayRoutes = require('./routes/DisplayRoutes');
const cartRoutes = require('./routes/CartRoutes');


// const jwt = require('jsonwebtoken');

// const JWT_SECRET = "aklajdhkj5482()y285kh@lksjkf%lslg%%sdsf23500sf";



const app = express();

const mongoUrl = "mongodb+srv://dansky328:z2KEGRrrkzcKO9ow@testcase01.znph9ry.mongodb.net/?retryWrites=true&w=majority";

// const mongoUrl = "mongodb+srv://t5:1234@cluster0.awr06ma.mongodb.net/THRIFT_STORE?retryWrites=true&w=majority";

// const DB_URL = "mongodb+srv://t5:1234@cluster0.awr06ma.mongodb.net/THRIFT_STORE?retryWrites=true&w=majority"


mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((error) => console.error(error));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))



app.use("/feedbacks", routes);
app.use("/user", userRoutes);
app.use("/display", displayRoutes);
app.use("/cart", cartRoutes);




app.listen(5000, () => console.log("Server Connecting..."));



// Define a middleware function to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});