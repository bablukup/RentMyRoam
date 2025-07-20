const express = require("express");
const {reviewSchema} = require("../schema");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

// Custom Middleware to Validate Review Data
const validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    }
    next();
};

//Review.post Routes
router.post("/", validateReviews,
    wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash('success', 'Review added successfully!');
    res.redirect(`/listings/${listing._id}`);
}));

//DELETE: Review Routes
router.delete("/:reviewId",
    wrapAsync(async(req, res)=> {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull:{ reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('error', 'Review deleted!');
    res.redirect(`/listings/${id}`);
}));

module.exports = router;