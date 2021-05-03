const {Router} = require('express')
const router = Router()
const registerController = require('../controllers/register.controller')
const {check} = require('express-validator')


router.post('/register', [
    check('username', "username can't be blank.").notEmpty(),
    check('username', 'username must be at lest 3 character').isLength({min: 3}),
    check('email', "wrong email").isEmail(),
    check('password', "password must min 4 characters or max 20").isLength({min: 4, max: 20})
], registerController)

module.exports = router