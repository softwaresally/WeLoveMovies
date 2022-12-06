const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

async function reviewExists(req, res, next) {
    const foundReview = await reviewsService.read(Number(req.params.reviewId))
    
        if (foundReview) {
        res.locals.review = foundReview;
        return next();
    }
    next({
        status: 404,
        message: `Review cannot be found.`,
    });
}

async function list(req, res, next) {
    const data = await reviewsService.list();
    res.json({ data });
}

async function destroy(req, res, next) {
    const reviewId = Number(req.params.reviewId);
    await reviewsService.destroy(reviewId);
    res.sendStatus(204);
}

async function update(req, res, next) {
    const updatedReview = {
        ...req.body.data,
        review_id: req.params.reviewId,
    };
    await reviewsService.update(updatedReview);
    const data = await reviewsService.read(updatedReview.review_id);
    res.json({ data });
}

module.exports = {
    list,
    update: [reviewExists, asyncErrorBoundary(update)],
    delete: [reviewExists, asyncErrorBoundary(destroy)],
}