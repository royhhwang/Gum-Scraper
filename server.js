var express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("request");
var axios = require("axios");

var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;
var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scraper", function (err, db) {
    if (err) {
        console.log("Unable to connect to server" + err);
    }
    else {
        useMongoClient: true
        console.log("Successfully connected!");
    }
});

app.get("/scrape", function (req, res) {
    axios.get("https://www.reddit.com/r/ProgrammerHumor/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("p.title").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            db.News
                .create(result)
                .then(function (dbNews) {
                    res.send("Scrape Complete");
                })
                .catch(function (err) {
                    res.json(err);
                });
        });
    });
});

app.get("/news", function (req, res) {
    db.News
        .find({})
        .then(function (dbNews) {
            res.json(dbNews);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/")

app.listen(PORT, function () {
    console.log("Connected on port " + PORT + "!");
});