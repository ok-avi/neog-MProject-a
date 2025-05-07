const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        numberOfRatings: {
            type: Number,
            min: 1,
        },
        category: {
            type: String,
            required: true,
            enum: ["Men", "Women", "Kids"],
        },
        upperwear: {
            type: String,
        },

        quantity: {
            type: Number,
            default: 1,
        },
        size: [
            {
                type: String,
                required: true,
                enum: ["S", "M", "XL", "XXL"],
            },
        ],
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
