const express = require('express');
const {getLaptops, getLaptop, createLaptop, updateLaptop, deleteLaptop, } = require('../controllers/laptops');

const router = express.Router();

router.route('/').get(getLaptops).post(createLaptop);   //route for get laptops and create laptop (no id)

router.route('/:id').get(getLaptop).put(updateLaptop).delete(deleteLaptop);    //route for get laptop, update laptop and delete laptop (with id)

module.exports = router;