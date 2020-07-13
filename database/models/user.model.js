const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    }
})

module.exports = model('user', userSchema)