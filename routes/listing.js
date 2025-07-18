const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {listingSchema} = require("../schema");

// Custom Middleware to Validate Listing Data
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    }
    next();
};

// INDEX: Show all listings
router.get("/",wrapAsync(async(req, res )=> {
    const allListing= await Listing.find({})
    res.render("listings/index",{allListing})
}));

// NEW: Form to create new listing
router.get("/new",(req, res)=> {
    res.render("listings/new");
});

// EDIT: Edit form
router.get("/:id/edit", wrapAsync(async(req, res)=> {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
}));

// UPDATE: Update listing in DB
router.put("/:id", validateListing, 
    wrapAsync(async (req, res)=> {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

// DELETE: Remove listing
router.delete("/:id", wrapAsync(async(req, res)=> {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
}));

// SHOW: Show a single listing
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
        throw new ExpressError(404, "Listing not found!");
    }

    res.render("listings/show", { listing });
}));

// CREATE: Add listing to DB
router.post("/", validateListing, 
    wrapAsync(async(req, res, next)=> {
    const newListing = new Listing (req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

module.exports = router;