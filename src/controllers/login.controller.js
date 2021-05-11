const { User, Token } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateAccessToken = (id, email, secret, time) => {
  const payload = {
    id,
    email,
  };

  return jwt.sign(payload, secret, { expiresIn: time });
};


const refreshToken = async (req, res) => {
  const {refreshToken} = req.body
  // ete refresh token chka request-i mej
  if (!refreshToken) {
    return res.status(403).send({
      message: "Access denied"
    })
  }

  const currentToken = await Token.findOne({ token: refreshToken })
  
  if (!currentToken) {
    return res.status(403).send({
      message: "Access denied"
    })
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
    if (err) {
        return res.status(403).send({
            message: "Access denied"
        })
    }
    const {_id, email} = user
    generateAccessToken(_id, email, process.env.JWT_SECRET, "15m")
    return res.status(200).send({
      message: "OK"
    })

    })
    
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const candidate = await User.findOne({ email });

    if (!candidate) {
      return res.status(403).send({
        message: "email or password doesnt match",
      });
    }

    const validPassword = await bcrypt.compare(password, candidate.password);

    if (!validPassword) {
      return res.status(403).send({
        message: "email or password doesnt match",
      });
    }

    const token = generateAccessToken(candidate._id, candidate.email, process.env.JWT_SECRET, "15m");
    const refreshToken = generateAccessToken(candidate._id, candidate.email, process.env.JWT_SECRET_REFRESH, "30d")

    const tokenM = await new Token({ token: refreshToken })
    await tokenM.save()

    return res.status(200).send({
      token,
      refreshToken,
      candidate,
    });
  } catch (err) {
    console.log("catch");
    return res.status(403).send({
      message: "email or password doesnt match",
    });
  }
};

module.exports = login;
