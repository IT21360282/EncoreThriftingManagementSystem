const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const getRouter = require('./routes/purchasing/routesGet')
const postRouter = require('./routes/purchasing/routesPost')
const getRouterSupplier = require('./routes/supplier/routesGet')
const postRouterSupplier = require('./routes/supplier/routesPost')
const putRouterSupplier = require('./routes/supplier/routesPut')

app.use(bodyParser.json())
app.use(cors())
app.use('/purchasingPost', postRouter)
app.use('/purchasingGet', getRouter)
app.use('/supplierPost', postRouterSupplier)
app.use('/supplierGet',getRouterSupplier )
app.use('/supplierPut',putRouterSupplier)

const PORT = 8000
const DB_URL = "mongodb+srv://t5:1234@cluster0.awr06ma.mongodb.net/THRIFT_STORE?retryWrites=true&w=majority"

mongoose.connect(DB_URL).then(() => {
    console.log('Database was connected')
}).catch((err) => {
    console.log('Database was not connected, Error orccured')
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`)
})