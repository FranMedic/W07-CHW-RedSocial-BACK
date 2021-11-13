require("dotenv").config();

const dBInitializer = require("./database/index");
const { initializeServer } = require("./server");

const redSocialDB = process.env.MONGO_RED_SOCIAL_DB;
const port = process.env.PORT ?? process.env.SERVER_PORT_RS ?? 6000;

(async () => {
  try {
    await dBInitializer(redSocialDB);
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
