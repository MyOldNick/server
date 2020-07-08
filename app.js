const express = require('express')
const app = express()
const cors = require('cors')
module.exports = server = require('http').createServer(app); //делаем такой колхоз чтобы передать server в файлик с сокетами

const socketOn = require('./sockets')
const connectToDB = require('./database')
const {usersRouter} = require('./routes')


connectToDB()

socketOn() //это включает сокеты

app.use(cors())
app.use(express.json())

app.use('/', usersRouter)

app.use('/hello', (req, res) => {
    res.json('Hello')
})


//важная фигня!!111 рас рас адын адын
//нужно писать именно SERVER, а не app
server.listen(3000, () => {
    console.log('server start');
})