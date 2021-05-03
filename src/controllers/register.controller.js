const { User } = require('../model')
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator')


const register = async (req, res) => {
    const { username, email, password } = req.body
    const errors = validationResult(req)

    try {
        const usernamecandidate = await User.findOne({ username })
        const emailcandidate = await User.findOne({ email })
        
        if (emailcandidate) {
            return res.status(403).send({
                message: "the email has already been taken"
            })
        }

        if (usernamecandidate) {
            return res.status(403).send({
                message: "the username has already been taken"
            })
        }

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ message: 'something went wrong', errors})
        }

        const hashedPassword = await bcrypt.hash(password, 7)

        const newuser = new User({ email, password: hashedPassword, username })
        newuser.save()
        res.json({message: "user has been signed up successfuly"})
    } catch (err) {
       res.json(err)
    }
}


module.exports = register