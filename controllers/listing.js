const { models } = require("mongoose")
const Listing = require("../models/listing");

module.exports.index = async(req, res )=> {
    const allListing= await Listing.find({})
    res.render("listings/index",{allListing})
};

module.exports.createNewListing = (req, res)=> {
    res.render("listings/new");
};

module.exports.editForm = async(req, res)=> {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
};

module.exports.updateListingInDB = async (req, res)=> {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req, res)=> {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash('error', 'Listing deleted!');
    res.redirect("/listings");
};

module.exports.ShowSingleListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate:{path: "author",},
    }).populate("owner");

    if (!listing) {
        throw new ExpressError(404, "Listing not found!");
    }

    res.render("listings/show", { listing });
};

module.exports.addListingtoDB = async(req, res, next)=> {
    try {
    console.log("Received listing data:", req.body.listing);
    const newListing = new Listing (req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'Listing created successfully!');
    res.redirect("/listings");
} catch (e) {
    console.error("Error creating listing:", e);
    req.flash("error", e.message);
    res.redirect("/listings/new");
}
};