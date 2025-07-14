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
    await Listing.insertMany(initData.data);
    console.log("Data was Store");
};

main().catch((err) => {
    console.log(err);
});