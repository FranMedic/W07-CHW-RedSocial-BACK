const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const debug = require("debug")("redS:server");

const chalk = require("chalk");
const {
  notFoundHandler,
  generalErrorMiddleware,
} = require("./middleware/errors");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.magentaBright(`Listen to port: ${port}`));
    });

    server.on("error", (error) => {
      debug(chalk.red("we have an error"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`The port ${port} is already in use (╯°□°）╯︵ ┻━┻`));
        reject(error);
      }
    });
    resolve(server);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  debug(chalk.green("REQUEST ARRIVED ʕง•ᴥ•ʔง"));
  next();
});

app.use("/users", usersRoutes);

app.use(notFoundHandler);
app.use(generalErrorMiddleware);

module.exports = { initializeServer, app };
