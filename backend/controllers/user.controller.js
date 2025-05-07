const User = require("../models/User.model.js");

async function getUserById(id) {
    try {
        const user = await User.findById(id);
        // console.log("user",user)
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserData(id) {
    try {
        const user = await User.findById(id)
            .populate("wishlists")
            .populate("carts")
            .populate("orders");
        return user;
    } catch (error) {
        throw error;
    }
}

async function addValueToArray(userId, addNewValue) {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: addNewValue,
            },
            { new: true }
        );
        // console.log(addNewValue, userId);
        return user;
    } catch (error) {
        throw error;
    }
}

async function removeValueFromArray(userId, valueToBeRemoved) {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: valueToBeRemoved,
            },
            { new: true }
        );
        console.log("fn working", valueToBeRemoved);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserById,
    getUserData,
    addValueToArray,
    removeValueFromArray,
};
