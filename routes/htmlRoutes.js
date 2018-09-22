module.exports = function(app, ask, cheerio, db){
// route to display the landing page

// route to display page with your saved articles

// Route for grabbing the main index page
app.get("/", function(req, res){
     db.Article.find({}).limit(10).sort(-scrappedAt)
     .then(data=>{
       res.render("index", data);
     })
});

// Route for grabbing a all Saved articles
app.get("/saved", function(req, res) {
     // TODO
     // ====
     // Finish the route so it finds one article using the req.params.id,
     // and run the populate method with "note",
     // then responds with the article with the note included
     db.Article.find({
       isSaved: true
     }).populate("comments").then(data=>{
       console.log(data);
       res.render("saved", data);
     })
   })}