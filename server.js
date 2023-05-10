const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express()

const getRouterPurchasing = require('./routes/purchasing/routesGet')
const postRouterPurchasing = require('./routes/purchasing/routesPost')
const deleteRouterPurchasing = require('./routes/purchasing/routesDelete')
const putRouterPurchasing = require('./routes/purchasing/routesPut')

const getRouterEmp = require('./routes/employee/routesGet')
const postRouterEmp = require('./routes/employee/routesPost')
const putRouterEmp = require('./routes/employee/routesPut')

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
app.use(postRoutes)
app.use(getRoutes)
app.use(deleteRoutes)
app.use(UpdateRoutes)
app.use('/employeePost', postRouterEmp)
app.use('/employeeGet', getRouterEmp)
app.use('/employeePut', putRouterEmp)


const getRouterSupplier = require('./routes/supplier/routesGet')
const postRouterSupplier = require('./routes/supplier/routesPost')
const putRouterSupplier = require('./routes/supplier/routesPut')

app.use(bodyParser.json())
app.use(cors())

app.use('/supplierPost', postRouterSupplier)
app.use('/supplierGet', getRouterSupplier)
app.use('/supplierPut', putRouterSupplier)

const getRouterFinance = require('./routes/finance/routesGet')
const postRouterFinance = require('./routes/finance/routesPost')
const PutRouterFinance = require('./routes/finance/routePut')
const deleteRouterFinance = require('./routes/finance/routeDelete')

app.use(bodyParser.json())
app.use(cors())

app.use('/financePost', postRouterFinance)
app.use('/financeGet', getRouterFinance)
app.use('/financePut', PutRouterFinance)
app.use('/financeDelete', deleteRouterFinance)

const PORT = 8000
const DB_URL = "mongodb+srv://t5:1234@cluster0.awr06ma.mongodb.net/THRIFT_STORE?retryWrites=true&w=majority"





//Dashboard Router {Manager Managemet }
const DashboardRouter = require("./routes/dashboard/employeeRoute.js");

//dashboard Router {category management}
const DashboardCatRouter = require("./routes/dashboard/categoryRoute.js");

app.use(bodyParser.json());
app.use(cors());

app.use("/dashboard", DashboardRouter);
app.use("/dashboard", DashboardCatRouter);



mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Database was connected");
    })
    .catch((err) => {
        console.log("Database was not connected, Error orccured");
        console.log(err);
    });


app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`)
})