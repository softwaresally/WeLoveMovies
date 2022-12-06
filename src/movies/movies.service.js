const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function listIfShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .groupBy("m.movie_id")
    .where({ is_showing : true })
}

function list(is_showing) {
    if (is_showing === "true") {
        return listIfShowing();
    }

    return knex("movies").select("*");
}

function read(id) {
    return knex("movies").select("*").where({ movie_id: id }).first();
}

function listTheatersByMovie(movieId) {
    return knex("movies_theaters as mt")
    .join("theaters", "mt.theater_id", "theaters.theater_id")
    // .join("movies as m", "mt.movie_id", "m.movie_id")
    // .distinct("mt.movie_id")
    .select("*")
    .where({ "movie_id": movieId })
    .distinct()
}

function listReviewsByMovie(movieId) {
    return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("*")
    .where({ "movie_id": movieId })
    .then((data) => data.map(addCriticInfo))
}

const addCriticInfo = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
});

module.exports = {
    list,
    listIfShowing,
    listTheatersByMovie,
    listReviewsByMovie,
    read,
}