const server = require('../app')
const io = require('socket.io')(server)

const {dialogsService} = require('../services')


function socketOn() {

    let connectUsers = []

    io.on('connection', (socket) => {

           let newUser

            //отправляем сообщеньку на килент, типо он подключен (это бесполезная фигня)
            socket.on('connected', connectionUser => {
                newUser = connectionUser
                connectUsers.push({id: socket.id, userId: connectionUser})
            })


            //пишем в консольку о новом подключении (это овобще не нужно, но пусть будет)
            console.log('user connected', socket.id)


            //находим в базе диалоги по запросу и отправляем на клиент
            socket.on('dialogs', async id => {
                const dialogsArr = await dialogsService.findDialogs(id)

                socket.emit('findDialog', dialogsArr)
            })


            socket.on('createDialog', async (userOne, userTwo) => {
                const dialog = await dialogsService.existenceDialog(userOne.id, userTwo._id)
                console.log(dialog)
                if(dialog.length > 0) {
                    console.log('Диалог есть')
                } else {
                    const newDialog = await dialogsService.createDialog(userOne, userTwo)

                    connectUsers.map(el => {
                        if (el.userId === userTwo._id) {
                            io.sockets.to(el.id).emit('addDialog', newDialog);
                        }
                    })

                    socket.emit('addDialog', newDialog)
                }
            })



            //подключаем клиент к комнате, room = id диалога, нигде ничего прописывать не нужно, комната создается сама
            socket.on('join', (user, room) => {
                socket.join(room)

                console.log(`${user} connected room : ${room}`)
            } )

            //событие отправки сообщения, room - диалог в который отправляем
            socket.on('message', async (message, room) => {
                console.log(message, room)

                const date = Date.now()

                await dialogsService.sendMessage(message, room, date)


                //отправить сообщение всем, кто подключен к определенной комнате
                io.sockets.in(room).emit('msg', message, room)
            })

        socket.on('disconnect', () => {
            connectUsers.forEach((el, index, array) => {
                if (el.userId === newUser) {
                    connectUsers.splice(index, 1)
                }
                console.log(connectUsers)
            })
        })



        }
    )
}

module.exports = socketOn;