const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.log(err);
    })
}

module.exports = connectToDB;