const userModel = require('../../database/models/user.model')


module.exports = {
    createUser: (user) => {
        return new userModel(user).save()
    },

    findUserByEmail: (email) => userModel.findOne({email: email}),

    findUserById: async (id) => await userModel.findOne({_id: id}, {login: 1, avatar: 1, online: 1}),

    //отправляем на клиент только ID и логины пользователей
    findUsers: () => userModel.find({}, {login: 1, avatar: 1}),

    updateAvatar: (id, photo) => userModel.findOneAndUpdate({_id: id}, {avatar: photo}),

    onlineStatus: (id, status) => userModel.findOneAndUpdate({_id: id}, {online: status})

}