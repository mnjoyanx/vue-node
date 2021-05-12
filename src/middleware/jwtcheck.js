const { verify } = require('jsonwebtoken')
require('dotenv').config()

const checkJwt = (req, res, next) => {
    
    const { authorization } = req.headers
    console.log(req.headers)
    if (!authorization) return res.status(401).send("Access denied. No token provided")

    try {
        const token = authorization.split(' ')[1]
        const decoded = verify(token, process.env.JWT_SECRET) 
        console.log(decoded, 123)
        req.user = decoded
        next()
        
    } catch (err) {
        return res.status(401).json({
            message: "Not Authorized"
        })    
    }

}


module.exports = checkJwt