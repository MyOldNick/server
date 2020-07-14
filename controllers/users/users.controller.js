const {hashPassword, checkPassword} = require('../../helpers')
const {usersService} = require('../../services')
const uuid = require('uuid').v1()
const fs = require('fs-extra').promises
const path = require('path')
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
            res.json({login: user.login, id: user._id, avatar: user.avatar, email: user.email})
        } else {
            res.json('Not found')
        }

    },

    //тут находим всех пользователей для того, чтобы найти кому писать
    //в будущем еще и сделаю поиск и все такое, но пока что только так
    findAllUsers: async (req, res) => {

        const users = await usersService.findUsers()

        res.json(users)
    },

    updateAvatar: async (req, res) => {
        const id = req.body.id

        console.log(req.files)
        const [avatar] = req.photo

        const photoDir = `users/${id}/photos`

        const fileExtension = avatar.name.split('.').pop()

        const photoName = `${uuid}.${fileExtension}`

        await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true})
        await avatar.mv(path.resolve(process.cwd(), 'public', photoDir, photoName))

        const newAvatar = `${photoDir}/${photoName}`

        await usersService.updateAvatar(id, newAvatar)


        res.json('ok')
    }
}