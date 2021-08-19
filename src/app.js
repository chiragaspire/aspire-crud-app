const express = require('express');
const userRouter = require('./routers/user');
const cors = require('cors');
const bodyParser=require('body-parser')
require('./db/mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})
app.use(userRouter);


module.exports = app;

