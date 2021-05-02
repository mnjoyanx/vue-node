const User = require('../model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const generateAccessToken = (id, email) => {
    const payload = {
        id, email
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "12h"})
}

const login = async (req, res) => {
    const { email, password } = req.body
    const candidate = User.findOne({ email })
    
    
    

    try {
          if (!candidate) {
        res.status(403).send({
            message: "email or password doesnt match"
        })
    }

    const correctPassword = candidate.password === password

    if (!correctPassword) {
        res.status(403).send({
            message: "email or password doesnt match"
        })
    }

    const token = generateAccessToken(candidate._id, candidate.email)

        res.status(200).send({
            token, candidate
        })

    } catch (err) {
        return res.status(403).send({
            message: "email or password doesnt match"
        })
    }
}

module.exports = login