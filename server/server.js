const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bcrypt = require('bcryptjs');
const app = express();

const routes = require("./routes/FeedbackRoute");
const userRoutes = require('./routes/UserRoute');
const displayRoutes = require('./routes/DisplayRoutes');
const cartRoutes = require('./routes/CartRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const commentRoutes = require('./routes/CommentRoutes'); 	


// const mongoUrl = "mongodb+srv://dansky328:z2KEGRrrkzcKO9ow@testcase01.znph9ry.mongodb.net/?retryWrites=true&w=majority";

const mongoUrl = "mongodb+srv://t5:1234@cluster0.awr06ma.mongodb.net/THRIFT_STORE?retryWrites=true&w=majority";

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
app.use('/pay', paymentRoutes);	
app.use('/comment', commentRoutes);

app.listen(8000, () => console.log("Server Connecting..."));







  
  