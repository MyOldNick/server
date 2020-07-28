const uuid = require('uuid').v1()
const fs = require('fs-extra').promises
const path = require('path')

const {hashPassword, checkPassword} = require('../../helpers')
const {usersService, tokensService} = require('../../services')
const {createToken} = require('../../helpers')
//тут нужно добавить обработку ошибок, но мне лень

module.exports = {

    //создание юзера, всьо проста изи
    createUser: async (req, res, next) => {
        const newUser = req.body

        console.log(req.body)
        console.log("Controller")

        newUser.password = await hashPassword(newUser.password)

        const result = await usersService.createUser(newUser)

        if(result) {
            res.json(`User ${newUser.login} create`)
        }


    },

    //авторизация, сессий нет, пока что не сделал
    authUser: async (req, res) => {
        const {email, password} = req.body


        //ищем пользователя по мылу
        const user = await usersService.findUserByEmail(email)

        //чекаем пароль, если все ок, отправляем логин пользователя на клиент. Больше ничего
        if(user) {
            await checkPassword(password, user.password)

            const tokens = createToken()

            const newTokens = await tokensService.createToken(tokens.refresh_token, tokens.access_token, user._id)

                res.json({login: user.login, _id: user._id, avatar: user.avatar, email: user.email, token: newTokens.access_token})
        } else {
            res.json('Not found')
        }

    },


    authToken: async (req, res) => {
        const userId = req.userId

        console.log(userId)

        if(!userId) {
            res.json('not found')
        }

        const user = await usersService.findUserById(userId)

        res.json(user)




    },


    logoutUser: async (req, res) => {
        const access_token = req.get('Authorization')

        await tokensService.deleteToken(access_token)

        res.json('ok')
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

        const updateUser = await usersService.findUserById(id)




        res.json(updateUser)
    }
}