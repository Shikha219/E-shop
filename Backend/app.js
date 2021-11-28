const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv/config');

app.use(cors());
app.options('*',cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));


//Routes
const productsRoutes = require('./routers/products')
const categoriesRoutes = require('./routers/categories')
const ordersRouter = require('./routers/orders')
const usersRouter = require('./routers/users')


const api = process.env.API_URL;

//routers
app.use(`${api}/products`,productsRoutes)
app.use(`${api}/categories`,categoriesRoutes)
app.use(`${api}/orders`,ordersRouter)
app.use(`${api}/users`,usersRouter)



// Database Connection
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})