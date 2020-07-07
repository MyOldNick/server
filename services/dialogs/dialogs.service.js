const dialogModel = require('../../database/models/dialog.model')

module.exports = {

    //ищем все диалоги, в которых есть наш пользователь
    findDialogs: (id) => dialogModel.find({'users.userId': id}).sort({updateAt: -1}),


    //находим диалог по ID, пушим в массив сообщений обьект нашей сообщеньки
    sendMessage: async (message, room, date) => {
        await dialogModel.findOneAndUpdate({_id: room}, {updateAt: date, $push: {message: message}})
    },

    existenceDialog: (idOne, idTwo) => {
        return dialogModel.find({$and: [{'users.userId': idOne}, {'users.userId': idTwo}]})

    },

    createDialog: (userOne, userTwo) => {
       return new dialogModel({users: [{userId: userOne.id, name: userOne.login}, {userId: userTwo._id, name: userTwo.login}]}).save()

    }

}