const knex = require("../db/connection");

function list() {
    return knex("reviews").select("*")
}

function destroy(reviewId) {
    return knex("reviews").where({ "review_id": reviewId }).del();
}

module.exports = {
    list,
    delete: destroy,
}