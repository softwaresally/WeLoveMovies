const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function list(req, res, next) {
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data });
}

async function read(req, res, next) { 
    const { movie: data } = res.locals
    res.json({ data })
}


function movieExists(req, res, next) {
    moviesService.read(req.params.movieId)
    .then((movie) => {
        if (movie) {
            res.locals.movie = movie;
            return next();
        }
        next({ status: 404, message: `Movie cannot be found.` });
        // res.status(404).json({
        //     "error": "Movie cannot be found."
        //   })
    })
    // .catch(console.log("THIS IS AN ERROR"));
}

async function listTheatersByMovie(req, res, next) {
    const { movieId } = req.params;
    const data = await moviesService.listTheatersByMovie(movieId);
    res.json({ data });
}

async function listReviewsByMovie(req, res, next) {
    const { movieId } = req.params;
    const data = await moviesService.listReviewsByMovie(movieId);
    res.json({ data });
}

// console.log(JSON.stringify(data, null, 2))

module.exports = {
    list: asyncErrorBoundary(list),
    listTheatersByMovie: [movieExists, asyncErrorBoundary(listTheatersByMovie)],
    listReviewsByMovie: [movieExists, asyncErrorBoundary(listReviewsByMovie)],
    // read: asyncErrorBoundary(read),
    read: [movieExists, asyncErrorBoundary(read)],
    
}

