const {Router} = require('express');
const router = Router();
const {usersController} = require('../../controllers')

//тут все изи
router.post('/register', usersController.createUser)

router.post('/auth', usersController.authUser)

router.get('/users', usersController.findAllUsers)



module.exports = router;