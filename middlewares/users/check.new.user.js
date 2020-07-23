const Joi = require('joi')

const {userValidate} = require('../../validators')

module.exports =  async (req, res, next) => {

    console.log('check')

    try{
        const user = req.body

        console.log(user)

        let {error} = await Joi.validate(user, userValidate)

        console.log(error)

        if(error) {
            next(new Error)
        }

        next()
        
    } catch (e) {
        res.json(e)
    }



}