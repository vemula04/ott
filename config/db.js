//db configuration...
const mongoose = require("mongoose");
//Set up default mongoose connection
// mongodb+srv://guest:<PASSWORD>@cluster0.w4two.mongodb.net
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
module.exports = db;
