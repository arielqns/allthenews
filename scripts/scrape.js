// require request axios and cheerio, making scrape possible
// var axios = require("axios");
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
    request("https://cnnespanol.cnn.com/seccion/mundo/", function(err, res, body){

    var $ = cheerio.load(body);
    
    var articles = [];

    $(".news--box-style-two.news--summary-destacado.news--105x60.news--with-border-bottom").each(function(i, element){

            var head = $(this).children(".news_media-item").text().trim();
            var sum = $(this).children(".news_excerpt").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                };

                articles.push(dataToAdd);
            }
    });
    cb(articles);
    });

};

module.exports = scrape;