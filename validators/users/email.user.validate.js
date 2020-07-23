const Joi = require('joi');

const {EMAIL_REGEXP} = require('../../constants/regexp')

module.exports = Joi.string().trim().regex(EMAIL_REGEXP).required()