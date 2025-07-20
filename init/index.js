// This script resets the listings collection and inserts fresh sample data into the database.
const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/RentMyRoam";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("connection to db");
    await initDB();
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"687cd054cea8edda416811ca",}));
    await Listing.insertMany(initData.data);
    console.log("Data was Store");
};

main().catch((err) => {
    console.log(err);
});