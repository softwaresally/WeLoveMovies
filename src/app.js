if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require("../src/movies/movies.router");
const reviewsRouter = require("../src/reviews/reviews.router");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);

module.exports = app;
