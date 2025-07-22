const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const {listingSchema, reviewSchema} = require("../schema");

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

module.exports.SaveRedirectUrl = (req, res, next) => {
    if (req.session && req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        console.log("Loaded redirectUrl for login:", res.locals.redirectUrl);
        delete req.session.redirectUrl;
    }
    next();
};

module.exports.isowner = async(req, res, next)=> {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
       req.flash("error", "you are not the owner of this listing");
       return res.redirect(`/listings/${id}`); 
    }
    next();
} ;

// Custom Middleware to Validate Listing Data
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    }
    next();
};

// Custom Middleware to Validate Review Data
module.exports.validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    }
    next();
};

module.exports.isReviewAuthor = async(req, res, next)=> {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
       req.flash("error", "you are not the author of this review");
       return res.redirect(`/listings/${id}`); 
    }
    next();
} ;
