const initializeDB = require("./db/db.connect.js");
require("dotenv").config();
const app = require("./app.js");

initializeDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
