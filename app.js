const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
module.exports = server = require('http').createServer(app); //делаем такой колхоз чтобы передать server в файлик с сокетами

const socketOn = require('./sockets')
const connectToDB = require('./database')
const {usersRouter, dialogsRouter} = require('./routes')


connectToDB()

socketOn() //это включает сокеты

app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', usersRouter)
app.use('/dialogs', dialogsRouter)
app.use('/hello', (req, res) => {
    res.json('Hello')
})


//важная фигня!!111 рас рас адын адын
//нужно писать именно SERVER, а не app
server.listen(5000, () => {
    console.log('server start');
})