const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    itemType:{
        type: String,
        enum: ['spicy','sweet'],
        required: true
    }
});

module.exports = mongoose.model('menu', menuSchema);