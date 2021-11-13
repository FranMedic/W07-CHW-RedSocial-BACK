const debug = require("debug")("redS:database");
require("dotenv").config();
const chalk = require("chalk");
const mongoose = require("mongoose");

const dBInitializer = (redSocialDB) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });

    mongoose.connect(redSocialDB, (error) => {
      if (error) {
        debug(chalk.red("Connection to DB failed  (╯°□°）╯︵ ┻━┻)"));
        debug(chalk.red(error.message));
        reject(error);
        return;
      }

      debug(chalk.magentaBright("Connection to DB succeful "));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug(chalk.blueBright("Desconectado de la DataBase"));
    });
  });

module.exports = dBInitializer;
