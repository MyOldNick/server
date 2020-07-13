const {Router} = require('express');
const router = Router();
const {usersController} = require('../../controllers')
const {checkAvatar, checkPhotosCount} = require('../../middlewares')

//тут все изи
router.post('/register', usersController.createUser)

router.post('/auth', usersController.authUser)

router.get('/users', usersController.findAllUsers)

router.patch('/avatar', checkAvatar, checkPhotosCount, usersController.updateAvatar)



module.exports = router;