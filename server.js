// npm dependancies 
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// express set-up
const PORT = process.env.PORT || 3000;
const app = express();

// express middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// mongoDB connect
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sweatastic", { 
    useNewUrlParser: true 
    , useFindAndModify: false
});

// routes
app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

// server start
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});