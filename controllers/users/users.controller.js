const {hashPassword, checkPassword} = require('../../helpers')
const {usersService} = require('../../services')

//тут нужно добавить обработку ошибок, но мне лень

module.exports = {

    //создание юзера, всьо проста изи
    createUser: async (req, res, next) => {
        const newUser = req.body

        newUser.password =  await hashPassword(newUser.password)

        usersService.createUser(newUser)

        res.json(`User ${newUser.login} create`)


    },

    //авторизация, сессий нет, пока что не сделал
    authUser: async (req, res, next) => {
        const {email, password} = req.body


        //ищем пользователя по мылу
        const user = await usersService.findUserByEmail(email)

        //чекаем пароль, если все ок, отправляем логин пользователя на клиент. Больше ничего
        if(user) {
            await checkPassword(password, user.password)
            res.json(user.login)
        } else {
            res.json('Not found')
        }

    },

    //тут находим всех пользователей для того, чтобы найти кому писать
    //в будущем еще и сделаю поиск и все такое, но пока что только так
    findAllUsers: async (req, res) => {

        const users = await usersService.findUsers()

        res.json(users)
    }
}