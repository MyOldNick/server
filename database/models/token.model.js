const {Schema, model} = require('mongoose');

const tokenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    
})