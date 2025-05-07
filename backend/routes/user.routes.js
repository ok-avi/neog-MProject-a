const express = require("express");
const router = express.Router();
const {
    getUserById,
    getUserData,
    addValueToArray,
    removeValueFromArray,
} = require("../controllers/user.controller.js");

router.get("/:userId", async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        res.json({ data: { user: user } });
    } catch (error) {
        res.json({ error: "Error while fetching user by id" });
    }
});

router.get("/:userId/data", async (req, res) => {
    try {
        const user = await getUserData(req.params.userId);
        res.json({ user: user });
    } catch (error) {
        res.json({ error: "Error while fetching user's populated data " });
    }
});

// add item to wishlist , order , cart
router.post("/add/wishlist", async (req, res) => {
    try {
        // console.log(req.body);
        const user = await addValueToArray(req.body.userId, {
            wishlists: req.body.wishlistId,
        });
        res.json({ data: user });
    } catch (error) {
        res.json({ error: "Error while updating wishlist" });
    }
});

router.post("/add/cart", async (req, res) => {
    try {
        console.log(req.body);
        const user = await addValueToArray(req.body.userId, {
            carts: req.body.cartId,
        });
        res.json({ data: user });
    } catch (error) {
        res.json({ error: "Error while updating Cart" });
    }
});

router.post("/add/order", async (req, res) => {
    try {
        // console.log(req.body);
        const user = await addValueToArray(req.body.userId, {
            orders: req.body.orderId,
        });
        res.json({ data: user });
    } catch (error) {
        res.json({ error: "Error while updating wishlist" });
    }
});

// remove item to wishlist , order , cart
router.post("/remove/wishlist", async (req, res) => {
    try {
        // console.log(obj, "object");
        const user = await removeValueFromArray(req.body.userId, {
            wishlists: req.body.wishlistId,
        });
        res.json({ data: user });
    } catch (error) {
        res.json({ error: "Error while removing items from user's wishlist" });
    }
});

router.post("/remove/cart", async (req, res) => {
    try {
        // console.log(obj, "object");
        const user = await removeValueFromArray(req.body.userId, {
            carts: req.body.cartId,
        });
        res.json({ data: user });
    } catch (error) {
        res.json({ error: "Error while removing items from user's wishlist" });
    }
});

router.post("/remove/order", async (req, res) => {
    try {
        // console.log(obj, "object");
        const user = await removeValueFromArray(req.body.userId, {
            orders: req.body.orderId,
        });
        res.json({ data: user });
    } catch (error) {
        res.json({ error: "Error while removing items from user's wishlist" });
    }
});

module.exports = router;
