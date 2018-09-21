// route to display the landing page

// route to display page with your saved articles

// Route for grabbing the main index page
app.get("/", function(req, res){
     db.Article.find({}).limit(10).sort(-scrappedAt)
});

// Route for grabbing a specific Article by id, populate it with it's comments
app.get("/saved", function(req, res) {
     // TODO
     // ====
     // Finish the route so it finds one article using the req.params.id,
     // and run the populate method with "note",
     // then responds with the article with the note included
     db.Article.findOne({
       _id: req.params.id
     }).populate("note").then(data=>{
       res.json(data);
     })
   });