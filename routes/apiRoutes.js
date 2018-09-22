module.exports = function(app, ask, cheerio, db){
// Route to initiate the scrape
app.get("/scrape", function(req, res) {
     // First, we grab the body of the html with request
     ask.get(process.env.SCRAPER_TARGET_URL, function(err, response, html) {
          if(err) console.log(err);
       // Then, we load that into cheerio and save it to $ for a shorthand selector
       var $ = cheerio.load(html);
          let counter = 0;
       // Now, we grab every h2 within an article tag, and do the following:
       $("div.article__content").each(function(i, element) {
         // Save an empty result object
         var result = {};
   
         // Add the text and href of every link, and save them as properties of the result object
         result.title = $(this)
           .children("h3")
           .text();
         result.link = $(this)
          .children("h3")
           .children("a")
           .attr("href");
        result.summary = $(this)
          .children("p")
          .text();

         // Create a new Article using the `result` object built from scraping
         db.Articles.findOneAndUpdate(result, result, {
           upsert: true,
           setDefaultsOnInsert: true
         })
           .then(function(dbArticle) {
             // View the added result in the console
             console.log(dbArticle);
           }).catch(err=>{
             console.log(err);
           })
       });
   
       // If we were able to successfully scrape and save an Article, send a message to the client
       res.send(`New articles successfully scraped!`);
     });
    });
// Route to Save a News Article
app.put("/articles/:id", function(res, req){
  db.Articles.findByIdAndUpdate({
    _id: req.params.id
  }, {
    isSaved : true
  }, result=>{
    res.json(result);
  })
});

// Route to Add Comment to an Article
app.put("/comments/:id", function(req, res){
  
})
// Route to Delete Comments from an Article
app.delete("/comments/:id", function(req, res){
  db.Comments.findByIdAndRemove({
    _id: req.params.id
  }, result=>{
    res.json(result);
  })
});
// Route to Delete a Saved Article
app.delete("/articles/:id", function(req, res){
  db.Articles.findByIdAndUpdate({
    _id: req.params.id
  }, {
    isSaved: false
  }, result=>{
    res.json(result);
  });
})};