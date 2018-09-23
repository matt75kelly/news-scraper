module.exports = function(app, ask, cheerio, db){
// route to display the landing page

// route to display page with your saved articles

// Route for grabbing the main index page
app.get("/", function(req, res){
     db.Articles.find({}).limit(10).sort("scrapedAt")
     .then(data=>{
       console.log(data);
       let hbObj = {
         articles : data
       }
       res.render("index", hbObj);
     })
});

// Route for grabbing a all Saved articles
app.get("/saved", function(req, res) {
     // TODO
     // ====
     // Finish the route so it finds one article using the req.params.id,
     // and run the populate method with "note",
     // then responds with the article with the note included
     db.Articles.find({
       isSaved: true
     }).populate("Comments").then(data=>{
       let hbObj = {
         articles: data
       }

       res.render("saved", hbObj);
     })
   })}