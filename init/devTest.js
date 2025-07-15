// devTest.js
// 🔧 Purpose: Create a single sample listing for testing routes & schema validation
const mongoose = require('mongoose');
const Listing = require('../models/listing');

const MONGO_URL = 'mongodb://127.0.0.1:27017/RentMyRoam';

async function seed() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");

        const sample = new Listing({
            title: "Sample Listing",
            description: "Just a development seed listing.",
            price: 500,
            location: "Varanasi",
            country: "India",
            image: {
                url: "https://source.unsplash.com/600x400/?house",
                filename: "default"
            }
        });

        await sample.save();
        console.log("Sample listing saved!");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close();
    }
}

seed();