const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isowner, validateListing} = require("../middleware/middleware");
const listingController = require("../controllers/listing");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing, 
     wrapAsync(listingController.addListingtoDB));
// INDEX: Show all listings

// NEW: Form to create new listing
router.get("/new", isLoggedIn,(listingController.createNewListing));

router.route("/:id")
    .put(isLoggedIn, isowner, validateListing, 
     wrapAsync(listingController.updateListingInDB))
    .delete(isLoggedIn, isowner, wrapAsync(listingController.destroyListing))
    .get(wrapAsync(listingController.ShowSingleListing));

// EDIT: Edit form
router.get("/:id/edit", isLoggedIn, isowner, wrapAsync(listingController.editForm));

module.exports = router;