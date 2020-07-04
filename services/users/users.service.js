const userModel = require('../../database/models/user.model')


module.exports = {
    createUser: (user) => {
        return new userModel(user).save()
    },

    findUserByEmail: (email) => userModel.findOne({email: email}),

    //отправляем на клиент только ID и логины пользователей
    findUsers: () => userModel.find({}, {login: 1})
}