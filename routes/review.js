const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {validateReviews, isLoggedIn, isReviewAuthor} = require("../middleware/middleware");
const reviewController = require ("../controllers/review");

//Review.post Routes
router.post("/", validateReviews,isLoggedIn,
    wrapAsync(reviewController.postReview));

//DELETE: Review Routes
router.delete("/:reviewId", isLoggedIn, 
    isReviewAuthor,
    wrapAsync(reviewController.destoryReview));

module.exports = router;