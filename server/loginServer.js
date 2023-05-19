const express = require('express')
const login = require("./db")
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.post('/SigninSignup', async(req,res)=>{
    const{email,password}=req.body


    try{
        const check = await login.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        res.json("notexist")
    }
})






app.post('/Signup', async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check = await login.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await login.insertMany([data])
        }
    }
    catch(e){
        res.json("notexist")
    }
})

app.listen(5000,()=>{
    console.log("PORT CONNETED")
})