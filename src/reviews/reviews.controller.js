const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

async function list(req, res, next) {
    const data = await reviewsService.list();
    res.json({ data });
}

async function destroy(req, res, next) {
    const { review } = res.locals;
    const { reviewId } = req.params;
    await reviewsService.delete(review.reviewId);
    res.sendStatus(204);
}

module.exports = {
    list,
    delete: [asyncErrorBoundary(destroy)],
}