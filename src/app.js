// application
const express = require('express')
const app = express()

// json parser
const bodyParser = require('body-parser')

// express validator
const expressValidator = require('express-validator')

// dev monitoring
const morgan = require('morgan')

// enviroment configuration
const dotenv = require('dotenv')
dotenv.config()

// load routes
const userRoutes = require('./routes/userRoutes')

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// put in routes
let listRoutes = userRoutes.init();
app.use(listRoutes);

// start up
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})