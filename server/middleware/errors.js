const chalk = require("chalk");
const { ValidationError } = require("express-validation");

const debug = require("debug")("redS:errors");

const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found (╯°□°）╯︵ ┻━┻`" });
};
// eslint-disable-next-line no-unused-vars
const generalErrorMiddleware = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Sent wrong format of request ! (╯°□°）╯︵ ┻━┻";
  }
  debug(chalk.red("There was an error (╯°□°）╯︵ ┻━┻: ", error.message));
  const message = error.code
    ? error.message
    : "General Error of server (╯°□°）╯︵ ┻━┻";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundHandler,
  generalErrorMiddleware,
};
