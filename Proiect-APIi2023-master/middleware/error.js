const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err}

    error.message = err.message;
    
    
    console.log(err);
    if(err.name === 'CastError'){
        const message = `Resource not found with id = ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //duplicate key
    if(err.code === 11000){
        const message = 'Duplicate value field entered.';
        error = new ErrorResponse(message, 400);
    }

    //validationn error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        succes: false,
        error: error.message || 'Server error.'
    });
}; 

module.exports = errorHandler;