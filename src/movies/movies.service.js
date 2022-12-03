const knex = require("../db/connection");

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

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {
    list,
    listIfShowing,
    read,
}