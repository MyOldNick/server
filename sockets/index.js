const server = require('../app')
const io = require('socket.io')(server)

const {dialogsService} = require('../services')

function socketOn() {
    io.on('connection', (socket) => {

            //отправляем сообщеньку на килент, типо он подключен (это бесполезная фигня)
            socket.emit('connected', 'You connected')


            //пишем в консольку о новом подключении (это овобще не нужно, но пусть будет)
            console.log('user connected', socket.id)


            //находим в базе диалоги по запросу и отправляем на клиент
            socket.on('dialogs', async user => {
                const dialogsArr = await dialogsService.findDialogs(user)

                socket.emit('findDialog', dialogsArr)
            })



            //подключаем клиент к комнате, room = id диалога, нигде ничего прописывать не нужно, комната создается сама
            socket.on('join', (user, room) => {
                socket.join(room)

                console.log(`${user} connected room : ${room}`)
            } )

            //событие отправки сообщения, room - диалог в который отправляем
            socket.on('message', async (message, room) => {
                console.log(message, room)

                await dialogsService.sendMessage(message, room)


                //отправить сообщение всем, кто подключен к определенной комнате
                io.sockets.in(room).emit('msg', message, room)
            })


        }
    )
}

module.exports = socketOn;