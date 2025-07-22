const { models } = require("mongoose")
const User = require("../models/user");

module.exports.signUpFormRender = (req, res) => {
    res.render("user/SignUp");
};

module.exports.signUpForm = async(req, res)=> {
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
};

module.exports.loginRender = (req, res) => {
    res.render("user/login");
};

module.exports.login = function(req, res) {
    req.flash('success', 'Welcome back to RentMyRoam!');
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logOut = (req, res)=> {
    req.logOut((err)=> {
        if(err) {
            return next(err);
        }
        req.flash('success', 'your logged out !');
        res.redirect("/listings");
    });
};