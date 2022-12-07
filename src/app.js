if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const moviesRouter = require("../src/movies/movies.router");
const reviewsRouter = require("../src/reviews/reviews.router");
const theatersRouter = require("../src/theaters/theaters.router");

const notFound = require("./errors/notFound");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);

app.use((error, req, res, next) => {
    const { status = 500, message = "error" } = error;
    res.status(status).json({ error: message })
})

module.exports = app;
