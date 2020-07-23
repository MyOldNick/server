const Joi = require('joi');

const checkEmail = require('./email.user.validate')
const {EMAIL_REGEXP} = require('../../constants/regexp')

module.exports = Joi.object().keys({
    login: Joi.string().trim().min(2).max(8).required(),
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
    password: Joi.string().trim().min(6).max(16).required()
})