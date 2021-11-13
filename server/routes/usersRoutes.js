const express = require("express");
const { validate } = require("express-validation");
const { userLogin, userRegister } = require("../controllers/userControllers");

const router = express.Router();

router.post("/login", validate(loginRequestSchema), userLogin);
router.post("/register", validate(registerRequestSchema), userRegister);

module.exports = router;
