const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect('mongodb+srv://root:root@cluster0.rsiqd.mongodb.net/telegram?retryWrites=true&w=majority', {useNewUrlParser: true})
    const db = mongoose.connection;
    db.on('error', (err) => {
        console.log(err);
    })
}

module.exports = connectToDB;