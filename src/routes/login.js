const { Router } = require('express')
const router = Router()
const loginController = require('../controllers/login.controller')

router.post('/login', loginController.login)
router.post('/refresh', loginController.refreshToken)
router.post('/logout', loginController.logout)


module.exports = router