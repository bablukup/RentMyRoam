const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2025/05/07/19/42/vase-9585892_1280.jpg",
            set: (v) =>
                v === ""
                    ? "https://cdn.pixabay.com/photo/2025/05/07/19/42/vase-9585892_1280.jpg"
                    : v,
        },
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
