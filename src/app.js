const express = require("express");
require("dotenv").config();
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const { runScrape } = require("./web-scraper");
const indeedJobs = require("./indeedJobs.json");
const hubJobs = require("./hubJobs.json");
const diceJobs = require("./diceJobs.json");

const app = express();

// View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Third-Party Middleware

app.use(cors());
app.use(compression()); // Compress all routes

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //

app.get("/", (req, res) => {
  // runScrape();
  res.render("index", {
    indeedList: indeedJobs,
    hubList: hubJobs,
    diceList: diceJobs,
  });
});

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

module.exports = app;
