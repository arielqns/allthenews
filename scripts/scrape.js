// require request axios and cheerio, making scrape possible
// var axios = require("axios");
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
    request("https://www.nytimes.com", function(err, res, body){

    var $ = cheerio.load(body);
    
    var articles = [];

    $(".css-8atqhb").each(function(i, element){

            var head = $(this).children(".css-1qwxefa esl82me0").text().trim();
            var sum = $(this).children(".css-zmmks0 eqveam60").text().trim();

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

    
    // $("div.breaking-news-link-container").each(function(i, element) {

    //     // Save the headline, link, reporter and date
    //     var headline = $(this).find("a").attr("title");
    //     var link = $(this).find("a").attr("href");
    //     var rd = $(this).find('ul').children('li').text();
    //     var len = rd.length;
    //     var date = rd.slice(-19);
    //     var reporter = rd.slice(0, (len - 19));
        
    //     // Save results in an object and push into the articles array
    //     if (headline && link) {
    //         articles.push({
    //         headline: headline,
    //         link: link,
    //         reporterDate: reporter + " " + date
    //         });
    //     }
    // });

    // // console.log("SCRAPE.JS ARTICLES ========> ");
    // console.log(articles);

    // // callback
    // cb(articles);

    // });
};

module.exports = scrape;