module.exports = (req, res, next) => {

    if(!req.photo.length) {
        return next(new Error())
    }

    if(req.photo.length > 1) {
        return next(new Error())
    }


    next()
}