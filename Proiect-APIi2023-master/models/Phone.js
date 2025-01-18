const mongoose = require('mongoose');
const slugify = require ('slugify');



const PhoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter phone model'],
        unique: true,
        trim: true,
        maxlength: [64, 'Char limit = 64']
    },
    slugname: String,
    brand: {
        type: String,
        required: [true, 'Enter brand name'],
        maxlength: [16, 'Char limit = 16']
    },
    os: String,
    description: {
        type: String,
        //required: [true, 'Enter description'],
        maxlength: [128, 'Char limit = 128']
    },
    price: {
        type: Number,
        required: [true, 'Enter price'],
        min: [1, 'Price min 1'],
        max: [8000, 'Price max 8000']
    }
});

PhoneSchema.pre('save', function(next){
    if(this.brand === "Apple")
        this.os = "iOS";
    else this.os = "Android";
    next();
});

PhoneSchema.pre('save', function(next){
    this.slugname = slugify(this.name, {lower: true});
    next();
});

module.exports = mongoose.model('Phone', PhoneSchema);