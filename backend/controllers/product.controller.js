const Product = require("../models/Product.model");

async function getAllProducts() {
    try {
        const product = await Product.find();
        return product;
    } catch (error) {
        throw error;
    }
}

async function getProductById(id) {
    try {
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        throw error;
    }
}

async function getProductByCategoryName(categoryValue) {
    try {
        const sentenceCaseCategoryValue =
            categoryValue.slice(0, 1).toUpperCase() +
            categoryValue.slice(1).toLowerCase();
        const product = await Product.find({
            category: sentenceCaseCategoryValue,
        });
        // console.log(product.length, sentenceCaseCategoryValue);
        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllProducts, getProductById, getProductByCategoryName };
