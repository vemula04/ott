/**
 * @author: Karteek Vemula
 * @description: Movies business logic
 * @createdDate 08/03/2024
 */
//Movies controller business logic here...
const MoviesModel = require("../models/movies");
const moment = require("moment");
// fetch movies with limits...

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} nxt
 */
const getMovies = async (req, res, nxt) => {
  const LIMIT = 20;
  try {
    console.log("---getMovies---");
    const movies = await MoviesModel.find({});
    // .limit(LIMIT);
    res.send({ statusCode: 200, data: movies });
  } catch (error) {
    nxt(error);
  }
};

//fetch movie by either title or genre...
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} nxt
 */
const searchMovieByTitleGenre = async (req, res, nxt) => {
  try {
    const { q } = req.query;
    const param = {
      $or: [{ title: q }, { genre: q }],
    };
    const movies = await MoviesModel.find(param);

    res.send({ statusCode: 200, data: movies });
  } catch (err) {
    nxt(err);
  }
};

//save a movie
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} nxt
 */
const saveAMovie = async (req, res, nxt) => {
  try {
    const { title, genre, rating, streaming_link, role } = req.body;
    /**
     * role = admin;
     */
    if (role === "admin") {
      const movies = {
        title: title,
        genre: genre,
        rating: rating,
        streaming_link: streaming_link,
        created_on: moment().format(),
      };
      const movie = new MoviesModel(movies);
      await movie
        .save()
        .then(async (data) => {
          console.log("Movie Saved Successfully");
          res.send({
            statusCode: 200,
            message: `Movie :: ${title} - Saved Successfully`,
          });
        })
        .catch((err) => console.log(err));
    } else {
      /**
       * HTTP STATUS CODE 401 : UnAuthorized...
       */
      res.send({
        statusCode: 401,
        message: `Unauthorized`,
      });
    }
  } catch (err) {
    nxt(err);
  }
};

/**
 * @description update a movie by movie id
 * @param {*} req
 * @param {*} res
 * @param {*} nxt
 * @return {*} res
 */
const updateAmovie = async (req, res, nxt) => {
  try {
    const _id = req.params.id; //_id:: movie id...
    const { title, genre, rating, streaming_link, role } = req.body;
    /**
     * @role: Admin then update...
     */
    if (role === "admin") {
      const param = {
        title: title,
        genre: genre,
        rating: rating,
        streaming_link: streaming_link,
        updated_on: moment().format(),
      };
      const updatedDoc = await MoviesModel.findByIdAndUpdate(_id, param, {
        new: true,
      });
      if (updatedDoc) {
        res.status(200).json({
          message: "Record updated successfully",
          data: updatedDoc,
        });
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    } else {
      /**
       * HTTP STATUS CODE 401 : UnAuthorized...
       */
      res.send({
        statusCode: 401,
        message: `Unauthorized`,
      });
    }
  } catch (err) {
    nxt(err);
  }
};

//delete a movie by movie id...
/**
 * @description method to delete a movie by movie id
 * @param {*} req
 * @param {*} res
 * @param {*} nxt
 */
const deleteAMovie = async (req, res, nxt) => {
  try {
    const _id = req.params?.id;
    const { role } = req.body;
    if (role === "admin") {
      const deletedDoc = await MoviesModel.findByIdAndDelete(_id);

      if (deletedDoc) {
        res
          .status(200)
          .json({ message: "Document deleted successfully", data: deletedDoc });
      } else {
        res.status(404).json({ message: "Document not found" });
      }
    } else {
      /**
       * HTTP STATUS CODE 401 : UnAuthorized...
       */
      res.send({
        statusCode: 401,
        message: `Unauthorized`,
      });
    }
  } catch (err) {
    console.log(`Error exception occurred :: `);
    console.error(err);
    nxt(err);
  }
};

module.exports = {
  saveAMovie,
  getMovies,
  searchMovieByTitleGenre,
  updateAmovie,
  deleteAMovie,
};
