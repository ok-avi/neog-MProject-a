const express = require("express");
const Product = require("./models/Product.model");
const User = require("./models/User.model.js");
const app = express();

const cors = require("cors");
app.use(cors());

const productRouter = require("./routes/product.routes.js");
const userRouter = require("./routes/user.routes.js");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("express app");
});

app.use("/api/products", productRouter);

app.use("/api/user", userRouter);

module.exports = app;
