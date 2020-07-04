const dialogModel = require('../../database/models/dialog.model')

module.exports = {

    //ищем все диалоги, в которых есть наш пользователь
    findDialogs: (user) => dialogModel.find({'users.name': user}),


    //находим диалог по ID, пушим в массив сообщений обьект нашей сообщеньки
    sendMessage: async (message, room) => {
        await dialogModel.findOneAndUpdate({_id: room}, {$push: {message: message}})
    }

}