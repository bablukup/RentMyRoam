// 📦 Import Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const {listingSchema} = require("./schema");

const MONGO_URL = "mongodb://127.0.0.1:27017/RentMyRoam";

// MongoDB Connection
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then((res)=> {
    console.log("connection to db");
})
.catch((err)=> {
    console.log(err);
});

// Middleware Setup
app.set("view engine", "ejs" );
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Root Route
app.get("/",(req, res)=> {
    res.send("Hi am root");
});

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
app.get("/listings",wrapAsync(async(req, res )=> {
    const allListing= await Listing.find({})
    res.render("listings/index",{allListing})
}));

// NEW: Form to create new listing
app.get("/listings/new",(req, res)=> {
    res.render("listings/new");
});

// EDIT: Edit form
app.get("/listings/:id/edit", wrapAsync(async(req, res)=> {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
}));

// UPDATE: Update listing in DB
app.put("/listings/:id", validateListing, 
    wrapAsync(async (req, res)=> {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

// DELETE: Remove listing
app.delete("/listings/:id", wrapAsync(async(req, res)=> {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
}));

// SHOW: Show a single listing
app.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressError(404, "Listing not found!");
    }

    res.render("listings/show", { listing });
}));

// CREATE: Add listing to DB
app.post("/listings", validateListing, 
    wrapAsync(async(req, res, next)=> {
    const newListing = new Listing (req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// Catch-All for Invalid Routes
app.all(/.*/,(req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
});

// ❗ Centralized Error Handler
app.use((err, req, res, next)=> {
    let {statusCode= 500, message="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {err});
});

// Start Server
app.listen(8080,()=> {
    console.log("root is working")
});