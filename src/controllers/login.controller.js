const { User } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (id, email) => {
  const payload = {
    id,
    email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(User, "usssser");
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

    const token = generateAccessToken(candidate._id, candidate.email);

    return res.status(200).send({
      token,
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
