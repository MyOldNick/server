const dialogModel = require('../../database/models/dialog.model')

module.exports = {

    //ищем все диалоги, в которых есть наш пользователь
    findDialogs: (id) => dialogModel.find({'users.userId': id}).sort({updateAt: -1}),

    existenceDialog: (idOne, idTwo) => {
        return dialogModel.find({$and: [{'users.userId': idOne}, {'users.userId': idTwo}]})

    },

    createDialog: (userOne, userTwo) => {
       return new dialogModel({users: [{userId: userOne._id, name: userOne.login}, {userId: userTwo._id, name: userTwo.login}]}).save()

    },

    sendMessage: (message, room, date) => {
        return dialogModel.findOneAndUpdate({_id: room}, {updateAt: date, $push: {message: message}})
    },

    findLastMessage: (id) => {
        return dialogModel.findOne({_id: id}, {message: {$slice: -1}})
    },

    findOneDialog: (dialogId) => dialogModel.findOne({_id: dialogId}),

    updateMessages: (dialogId, messages) => dialogModel.findOneAndUpdate({_id: dialogId}, {message: messages})

}