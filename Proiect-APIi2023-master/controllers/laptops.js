const Laptop = require('../models/Laptop');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//get all laptops
//GET /api/v1/laptops
exports.getLaptops = asyncHandler(async (req, res, next) => {
    
    let query;    
    
    const reqQuery = {...req.query}; 
    
    //field to remove (select)
    const removeFields=['select', 'sort'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryString = JSON.stringify(reqQuery);

    //greater than | greater than equal | less than | less than equal | in
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Laptop.find(JSON.parse(queryString));

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
    
    const laptops = await query;

        res.status(200).json({
            succes: true,
            numberoflaptops: laptops.length,
            data: laptops    
        });
});

//get a laptop
//GET /api/v1/laptops/:id
exports.getLaptop = asyncHandler(async (req, res, next) => {

        const laptop = await Laptop.findById(req.params.id);

        if(!laptop){
            return next(new ErrorResponse(`Resource not found with id = ${req.params.id}`, 404));
        }

        res.status(200).json({
            succes: true,
            data: laptop
        });

});

//create new laptop
//POST /api/v1/laptops
exports.createLaptop = asyncHandler(async (req, res, next) => {
        const laptop = await Laptop.create(req.body);

        res.status(201).json({
            succes: true,
            data: laptop
        })   

});

//update laptop
//PUT /api/v1/laptops/:id
exports.updateLaptop = asyncHandler(async (req, res, next) => {   

        const laptop = await Laptop.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!laptop) {
            return next(new ErrorResponse(`Resource not found with id = ${req.params.id}`, 404));
        }
            res.status(200).json({
                succes: true,
                data: laptop
            });  
});

//delete laptop
//DELETE /api/v1/laptops/:id
exports.deleteLaptop = asyncHandler(async (req, res, next) => {

        const laptop = await Laptop.findByIdAndDelete(req.params.id);
        
        if(!laptop) {
            return next(new ErrorResponse(`Resource not found with id = ${req.params.id}`, 404));
        }
            res.status(200).json({
                succes: true,
                data: {}
            });
});
