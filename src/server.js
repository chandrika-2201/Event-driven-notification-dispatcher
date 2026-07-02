require("dotenv").config();

const app = require("./app");

// Import database (this creates the database and tables)
require("./db/database");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});