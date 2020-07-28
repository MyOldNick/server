const {Schema, model} = require('mongoose');

const tokenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    access_token: String,

    refresh_token: String,

    createAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = model('token', tokenSchema)