module.exports = (req, res, next) => {

    const photoMimetypes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp']

    req.photo = []

    if(!req.files) {
        next()
    }

    const files = Object.values(req.files)

    for (let i in files) {
        const {size, mimetype} = files[i]

        if(photoMimetypes.includes(mimetype)) {

            if(size > 5 * 1024 * 1024) {
                return next(new Error())
            }

            req.photo.push(files[i])

        } else {
            return next(new Error())
        }
    }

    next()
}