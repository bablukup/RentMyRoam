// 📦 Import Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/review");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localstrategy = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/user");


// MongoDB Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/RentMyRoam";
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

//Session
const sessionOptions = {
    secret: "bablu",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expire: new Date(Date.now() + 7* 60* 60* 1000),
        maxAge: 7* 60* 60* 1000,
        httpOnly: true,
    }
};

// Root Route
app.get("/",(req, res)=> {
    res.send("Hi am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Mount your modular routers here 👇
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

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