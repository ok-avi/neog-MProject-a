const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGODB;

async function initializeDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(`Error while connecting to DB: ${error}`);
    }
}

module.exports = initializeDB;
