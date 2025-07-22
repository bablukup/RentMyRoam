const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const {SaveRedirectUrl} = require("../middleware/middleware");
const userController = require("../controllers/user");

router.route("/SignUp")
    .get((userController.signUpFormRender))
    .post(wrapAsync(userController.signUpForm));

router.route("/login")
    .get((userController.loginRender))
    .post( SaveRedirectUrl,
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }),
    userController.login
);

router.get("/logout", userController.logOut);

module.exports = router;