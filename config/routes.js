//Server routes

//Bring in the Scrape fn from our scripts directory
var scrape = require("../scripts/scrape");

//Bring headlines and notes from the controller
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router) {
    //This route enders the homepage
    router.get("/", function(req, res) {
        res.render("home");
    });

    // This route enders the saved handlebars page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    // fetch headlines via the api
    router.get("/api/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            }
            else {
                
                res.json({
                    message: "Added " + docs.insertedCount + " New articles!"
                });
            }
        });
    });

    // get headlines from the db
    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        
        headlinesController.get(query, function(data) {
            res.json(data);
        });
    });

    // Route to delete a specific headline
    router.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

 // Route to update the headlines
    router.patch("/api/headlines", function(req, res) {
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        });
    });

 // Route to grab ll notes associated with a headline
    router.get("/api/notes/:headline_id?", function(req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });

    // Route to delete a note
    router.delete("/api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    // Route to post new notes to articles
    router.post("/api/notes", function(req, res) {
        notesController.save(req.body, function(data) {
            res.json(data);
        });
    });


    // // Route to update a specific headline 
    // router.put("/api/headlines/:id", function(req, res) {
    //     var query = {};
    //     query._id = req.params.id;
    //     headlinesController.update(req.body, function(err, data) {
    //         res.json(data);
    //     });
    // });

   

    // // route to clear the headlines
    // router.delete("/api/clear", function(req, res) {
    //     var query = {};
    //     console.log(query);
    //     headlinesController.delete(query, function(err, data) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         res.json(data);
    //     });
    // });
}