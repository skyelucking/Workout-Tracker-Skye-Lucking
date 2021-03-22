const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require("./routes/api-routes.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/hanzandfranz',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

// routes
app.use(morgan("dev"));
app.use(router);
require("./routes/html-routes.js")(app);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});