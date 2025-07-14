const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const { redirect } = require("react-router-dom");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/RentMyRoam";

main()
    .then((res)=> {
    console.log("connection to db");
})
.catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req, res)=> {
    res.send("Hi am root");
});

app.set("view engine", "ejs" );
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//Index Route
app.get("/listings",async(req, res )=> {
    const allListing= await Listing.find({})
    res.render("listings/index",{allListing})
});

//New Route
app.get("/listing/new",(req, res)=> {
    res.render("listings/new");
});

//Edit Route
app.get("/listings/:id/edit", async(req, res)=> {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
});

//Update Route
app.put("/listings/:id",async (req, res)=> {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async(req, res)=> {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
});

//Show Route
app.get("/listings/:id", async(req, res)=> {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show",{listing});
});

//Create Route
app.post("/listings", async(req, res)=> {
    const newListing = new Listing (req.body);
    await newListing.save();
    res.redirect("/listings");
});


// app.get("/testlisting", async(req, res) => {
//     let SampleListing = new Listing({
//         title: "This is first Listing.",
//         description: " Listing on DB ",
//         price: 1200,
//         location: "Gaya",
//         country: " India",
//     });
//     await SampleListing.save();
//     console.log(" Sample was save");
//     res.send("testing done");
// }); 

app.listen(8080,()=> {
    console.log("root is working")
});