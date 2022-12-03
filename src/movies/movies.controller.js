const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function list(req, res, next) {
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data });
}

async function read(req, res, next) {    
    res.json({ data: res.locals.movie })
}


async function movieExists(req, res, next) {
    const foundMovie = await moviesService.read(req.params.movieId);
    console.log(foundMovie);
    if (foundMovie) {
        res.locals.movie = foundMovie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });
}

// console.log(JSON.stringify(data, null, 2))

module.exports = {
    list: asyncErrorBoundary(list),
    read,
    // read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
}

