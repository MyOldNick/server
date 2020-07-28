const jwt = require('jsonwebtoken')

const {tokensService} = require('../../services')

module.exports = async (req, res, next) => {

    const token = req.get('Authorization')

    if(!token) {
        console.log('Not valid token')
        return next()
    }

    jwt.verify(token, 'Mops', (err) => {
        if(err) {
            throw new Error

        }
    })

    const tokensDB = await tokensService.findAccessToken(token)

    if (!tokensDB) {
        console.log('Not valid token')
        return next()
    }

    req.userId = tokensDB.userId

    next()
}