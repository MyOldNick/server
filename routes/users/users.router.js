const {Router} = require('express');
const router = Router();
const {usersController} = require('../../controllers')
const {checkAvatar, checkPhotosCount, checkNewUser, checkToken} = require('../../middlewares')

//тут все изи
router.post('/register', usersController.createUser)

router.post('/token', checkToken, usersController.authToken)

router.post('/auth', usersController.authUser)

router.put('/logout', checkToken, usersController.logoutUser)

router.get('/users', usersController.findAllUsers)

router.put('/avatar', checkAvatar, checkPhotosCount, usersController.updateAvatar)



module.exports = router;