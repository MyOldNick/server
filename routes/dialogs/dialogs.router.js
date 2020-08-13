const {Router} = require('express');
const router = Router();
const {dialogsController} = require('../../controllers')


router.post('/', dialogsController.readAllMessages)

module.exports = router