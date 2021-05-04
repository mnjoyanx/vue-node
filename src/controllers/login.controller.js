const { User, Token } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (id, email, secret) => {
  const payload = {
    id,
    email,
  };

  return jwt.sign(payload, secret, { expiresIn: "12h" });
};

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

    const token = generateAccessToken(candidate._id, candidate.email, process.env.JWT_SECRET);
    const refreshToken = generateAccessToken(candidate._id, candidate.email, process.env.JWT_SECRET_REFRESH)

    const tokenM = new Token({ token: refreshToken })
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
