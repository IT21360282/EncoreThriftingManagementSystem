const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

const getRouterPurchasing = require('./routes/purchasing/routesGet')
const postRouterPurchasing = require('./routes/purchasing/routesPost')
const deleteRouterPurchasing = require('./routes/purchasing/routesDelete')
const putRouterPurchasing = require('./routes/purchasing/routesPut')

app.use(bodyParser.json())
app.use(cors())
app.use('/purchasingPost', postRouterPurchasing)
app.use('/purchasingGet', getRouterPurchasing)
app.use('/purchasingDelete', deleteRouterPurchasing)
app.use('/purchasingPut', putRouterPurchasing)

//stock
const postRoutes = require('./routes/stock/routesPost')
const getRoutes = require('./routes/stock/routesGet')
const deleteRoutes = require('./routes/stock/routesDelete')
const UpdateRoutes = require('./routes/stock/routesUpdate')
app.use( postRoutes)
app.use(getRoutes)
app.use(deleteRoutes)
app.use(UpdateRoutes)

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




 
 

