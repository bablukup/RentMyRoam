const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const {SaveRedirectUrl} = require("../middleware/middleware");

router.get("/SignUp",(req, res) => {
    res.render("user/SignUp");
});

router.post("/SignUp",wrapAsync(async(req, res)=> {
    try{
        let{username, email, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=> {
            if(err) {
                return next(err);
            }
            req.flash('success', 'Welcome to RentMyRoam!');
        res.redirect("/listings");
        });   
    }catch (err){
        req.flash('error', ` ${err.message}`);
        res.redirect("/SignUp");
    }
}));

router.get("/login",(req, res) => {
    res.render("user/login");
});

router.post("/login", SaveRedirectUrl,
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }),
    function(req, res) {
        req.flash('success', 'Welcome back to RentMyRoam!');
        const redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);


router.get("/logout",(req, res)=> {
    req.logOut((err)=> {
        if(err) {
            return next(err);
        }
        req.flash('success', 'your logged out !');
        res.redirect("/listings");
    });
});

module.exports = router;