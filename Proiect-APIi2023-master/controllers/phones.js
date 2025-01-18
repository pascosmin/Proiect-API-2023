const Phone = require('../models/Phone');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//desc     get all phones
//route    GET /api/v1/phones
exports.getPhones = asyncHandler(async (req, res, next) => {
    let query;    
    
    const reqQuery = {...req.query}; 
    
    //field to remove (select)
    const removeFields=['select', 'sort'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryString = JSON.stringify(reqQuery);

    //greater than | greater than equal | less than | less than equal | in
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Phone.find(JSON.parse(queryString));

    //select fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //sorting option

    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    
    const phones = await query;

        res.status(200).json({
            succes: true,
            numberofphones: phones.length,
            data: phones    
        });
});

//desc     get a phone
//route    GET /api/v1/phones/:id
exports.getPhone = asyncHandler(async (req, res, next) => {

    const phone = await Phone.findById(req.params.id);

    if(!phone){
        return next(new ErrorResponse(`Resource not found with id = ${req.params.id}`, 404));
    }

    res.status(200).json({
        succes: true,
        data: phone
    });

});

//desc     create new phone
//route    POST /api/v1/phones
exports.createPhone = asyncHandler(async (req, res, next) => {
    const phone = await Phone.create(req.body);

    res.status(201).json({
        succes: true,
        data: phone
    })   

});

//desc     update phone
//route    PUT /api/v1/phones/:id
exports.updatePhone = asyncHandler(async (req, res, next) => {   

    const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!phone) {
        return next(new ErrorResponse(`Resource not found with id = ${req.params.id}`, 404));
    }
        res.status(200).json({
            succes: true,
            data: phone
        });  
});

//desc     delete phone
//route    DELETE /api/v1/phones/:id
exports.deletePhone = asyncHandler(async (req, res, next) => {

    const phone = await Phone.findByIdAndDelete(req.params.id);
    
    if(!phone) {
        return next(new ErrorResponse(`Resource not found with id = ${req.params.id}`, 404));
    }
        res.status(200).json({
            succes: true,
            data: {}
        });
});

