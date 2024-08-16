const express = require("express");
const { home, register, login, user } = require("../Controllers/controllers");
const validate = require("../Middlewares/middleware");
const router = express.Router();
const { signupSchema } = require("../Vallidators/validators.js");
const { getMiddleware } = require("../Middlewares/auth.js");

router.route("/").get(home);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(login);

router.route("/user").get(getMiddleware, user);

module.exports = {
  router,
};
