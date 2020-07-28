const jwt = require('jsonwebtoken')

module.exports = () => {

    const access_token = jwt.sign({}, 'Mops', {expiresIn: '10m'})
    const refresh_token = jwt.sign({}, 'Mops', {expiresIn: '1d'})

    return {
        access_token, refresh_token
    }
}