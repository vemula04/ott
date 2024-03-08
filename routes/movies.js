/**
 * @author: Karteek Vemula
 * @description: Movies routes
 * @createdDate 08/03/2024
 */

/*
*
- `GET /movies`: List all the movies in the lobby
- `GET /search?q={query}`: Search for a movie by title or genre
- `POST /movies`: Add a new movie to the lobby (requires "admin" role)
- `PUT /movies/:id`: Update an existing movie's information (title, genre, rating, or streaming link) 
(requires "admin" role)
- `DELETE /movies/:id`: Delete a movie from the lobby (requires "admin" role
*
*/

const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");

// - `GET /movies`: List all the movies in the lobby
router.get("/movies", moviesController.getMovies);

// - `GET /search?q={query}`: Search for a movie by title or genre
router.get("/search", moviesController.searchMovieByTitleGenre);

// - `POST /movies`: Add a new movie to the lobby (requires "admin" role)
router.post("/movies", moviesController.saveAMovie);

/**
 * - `PUT /movies/:id`: Update an existing movie's information (title, genre, rating, or streaming link) 
(requires "admin" role)
 */
router.put("/movies/:id", moviesController.updateAmovie);

//- `DELETE /movies/:id`: Delete a movie from the lobby (requires "admin" role)
router.delete("/movies/:id", moviesController.deleteAMovie);

module.exports = router;
