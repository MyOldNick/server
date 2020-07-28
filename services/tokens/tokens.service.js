const tokenModel = require('../../database/models/token.model')


module.exports = {
    createToken: (tokenRefresh, tokenAccess, userId) => new tokenModel({userId: userId, access_token: tokenAccess, refresh_token: tokenRefresh}).save(),

    findAccessToken: (access) => tokenModel.findOne({access_token: access}),

    deleteToken: (access) => tokenModel.findOneAndDelete({access_token: access}),
}