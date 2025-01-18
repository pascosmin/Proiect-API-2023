const express = require('express');
const {getPhones, getPhone, createPhone, updatePhone, deletePhone, } = require('../controllers/phones');

const router = express.Router();

router.route('/').get(getPhones).post(createPhone);     //route for get phones and create phone (no id)

router.route('/:id').get(getPhone).put(updatePhone).delete(deletePhone);    //route for getphone, update phone and delete phone (with id)

module.exports = router;