/**
 * @author: Karteek Vemula
 * @description: Movies Schema
 * @createdDate 08/03/2024
 */
const mongoose = require('mongoose');

//title, genre, rating, or streaming link
const MoviesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1
    },
    streaming_link: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 1
    },
    created_on: {
        type: Date
    },
    updated_on: {
        type: Date        
    }
});

module.exports = mongoose.model('movies', MoviesSchema);