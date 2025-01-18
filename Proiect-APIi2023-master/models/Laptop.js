const mongoose = require ('mongoose');
const slugify = require('slugify');



const LaptopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter laptop model'],
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
    description: {
        type: String,
        //required: [true, 'Enter description'],
        maxlength: [128, 'Char limit = 128']
    },
    price: {
        type: Number,
        required: [true, 'Enter price'],
        min: [1, 'Price min 1'],
        max: [10000, 'Price max 10000']
    }

});

//create laptop slug from name

LaptopSchema.pre('save', function(next){
    this.slugname = slugify(this.name, {lower: true});
    next();
});


module.exports = mongoose.model('Laptop', LaptopSchema);