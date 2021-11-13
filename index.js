require("dotenv").config();

const dBInitializer = require("./database/index");

const redSocialDB = process.env.MONGO_RED_SOCIAL_TEST;

(async () => {
  try {
    await dBInitializer(redSocialDB);
  } catch (error) {
    process.exit(1);
  }
})();
