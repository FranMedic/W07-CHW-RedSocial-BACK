const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("Not authorized");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];

    if (!token) {
      const error = new Error("Token is missing...");
      error.code = 401;
      next(error);
    } else {
      try {
        const userData = await jwt.verify(token, process.env.TOKEN_SECRETE);
        req.userId = userData.id;
        req.userName = userData.name;
        next();
      } catch {
        const error = new Error("Wrong token");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
