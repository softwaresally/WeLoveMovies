const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
    return knex("reviews").select("*")
}

function read(reviewId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "review_id": reviewId })
    .first()
    .then(addCriticInfo);
}

const addCriticInfo = mapProperties({
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
});

function update(updatedReview) {
    return knex("reviews")
    .select("*")
    .where({ "review_id": updatedReview.review_id})
    .update(updatedReview, "*")
}

function destroy(reviewId) {
    return knex("reviews").where({ "review_id": reviewId }).del();
}

module.exports = {
    list,
    read,
    update,
    destroy,
}