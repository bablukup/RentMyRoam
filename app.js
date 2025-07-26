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
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localstrategy = require("passport-local");
const User = require("./models/user");
const userRoutes = require("./routes/user");


// MongoDB Connection
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(()=> {
    console.log("connection to db");
    
})
.catch((err)=> {
    console.log(err);
});
async function main() {
    await mongoose.connect(dbUrl);
}

// Middleware Setup
app.set("view engine", "ejs" );
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error", ()=> {
    console.log("ERROR in Mongo Session Store",err)
});

//Session
const sessionOptions = {
    store,
    secret: process.env.SECRET,
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
    res.redirect("/listings");
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