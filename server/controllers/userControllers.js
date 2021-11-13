require("dotenv").config();
const debug = require("debug")("redS:userController");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");

const User = require("../../database/models/user");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.red("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧"));
    const error = new Error("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      debug(chalk.redBright("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧"));
      const error = new Error("Wrong Credentials ʰᵘʰ (ꐦ○_○）✧");
      error.code = 401;
      next(error);
    } else {
      const token = JsonWebTokenError.sign(
        { id: user.id, name: user.name },
        process.env.TOKEN_SECRETE,
        { expiresIn: 72 * 60 * 60 }
      );
      res.json({ token });
    }
  }
};

module.exports = { userLogin };
