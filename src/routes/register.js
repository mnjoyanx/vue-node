const {Router} = require('express')
const router = Router()
const registerController = require('../controllers/register.controller')


router.post('/register', registerController)

module.exports = router