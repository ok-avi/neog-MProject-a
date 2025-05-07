const express = require("express");
const {
    getAllProducts,
    getProductById,
    getProductByCategoryName,
} = require("../controllers/product.controller.js");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const product = await getAllProducts();
        res.json({ products: product });
    } catch (error) {
        res.json({ error: "Error while fetching data" });
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const product = await getProductById(req.params.productId);
        // console.log(req.params.productId, "product");
        res.json({ product: product });
    } catch (error) {
        res.json({ error: "Error while fetching product with id" });
    }
});

router.get("/category/:categoryName", async (req, res) => {
    try {
        const product = await getProductByCategoryName(req.params.categoryName);
        res.json({ products: product });
    } catch (error) {
        res.json({ error: "Error while fetching data by category" });
    }
});

module.exports = router;
