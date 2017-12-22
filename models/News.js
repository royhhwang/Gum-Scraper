var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    redditter: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    }
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;