/**
 * @author: Karteek Vemula
 * @description: Main server file
 * @createdDate 08/03/2024
 */
const createError = require("http-errors");
const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const moviesRouter = require("./routes/movies");
const app = express();
require("./config/db");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", moviesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(`app .use...`)
  next();
});
process.on('uncaughtException', (error) => {
  console.log(`uncaughtException`);
})
app.listen(process.env.PORT, () => {
  console.log(`Server started on port :: ${process.env.PORT}`);
})
