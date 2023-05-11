const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://dansky328:z2KEGRrrkzcKO9ow@testcase01.znph9ry.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Database Connected");
})
.catch(() => {
    console.log("failed");
})

const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const login = mongoose.model("login", newSchema)

module.exports=login