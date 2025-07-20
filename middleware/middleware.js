module.exports.isLoggedIn = (req, res, next) => {
    console.log("Attempted access on:", req.method, req.originalUrl);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'you must be logged in !');
        console.log("Saved redirectUrl:", req.session.redirectUrl);
        return res.redirect("/login");
    }
    next();
};

// module.exports.SaveRedirectUrl = (req, res, next) => {
//     if (req.SaveRedirectUrl.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// };

module.exports.SaveRedirectUrl = (req, res, next) => {
    if (req.session && req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        console.log("Loaded redirectUrl for login:", res.locals.redirectUrl);
        delete req.session.redirectUrl;
    }
    next();
};

