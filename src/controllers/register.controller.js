const { User } = require('../model')
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    const { username, email, password } = req.body

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

        const hashedPassword = await bcrypt.hash(password, 7)

        const newuser = new User({ email, password: hashedPassword, username })
        newuser.save()
        res.json({message: "user has been signed up successfuly"})
    } catch (err) {
        console.log(err)
       res.json(err)
    }
}


module.exports = register