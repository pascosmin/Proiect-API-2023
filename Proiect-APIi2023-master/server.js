const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
//const colors = require('colors');

//Load env vars
dotenv.config({ path: './config/config.env' });

///connect to server
connectDB();

const laptops = require('./routes/laptops'); 
const phones = require('./routes/phones');

const app = express();

//Body parser

app.use(express.json());

//dev logging middleware

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//use routes
app.use('/api/v1/laptops', laptops);
app.use('/api/v1/phones', phones);

//use error handler
app.use(errorHandler);

const PORT = process.env.PORT || 2255;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`); 
    server.close(() => process.exit(1));
})

