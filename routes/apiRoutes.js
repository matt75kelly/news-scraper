// Route to initiate the scrape
app.get("/scrape", function(req, res) {
     // First, we grab the body of the html with request
     ask.get("https://www.marketwatch.com/", function(err, response, body) {
          if(err) console.log(err);
       // Then, we load that into cheerio and save it to $ for a shorthand selector
       var $ = cheerio.load(body.data);
          let counter = 0;
       // Now, we grab every h2 within an article tag, and do the following:
       $("article h2").each(function(i, element) {
         // Save an empty result object
         var result = {};
   
         // Add the text and href of every link, and save them as properties of the result object
         result.title = $(this)
           .children("a")
           .text();
         result.link = $(this)
           .children("a")
           .attr("href");
   
         // Create a new Article using the `result` object built from scraping
         db.Article.create(result)
           .then(function(dbArticle) {
             // View the added result in the console
             console.log(dbArticle);
             counter += 1;
           })
       });
   
       // If we were able to successfully scrape and save an Article, send a message to the client
       res.send(`Scrape Complete!\n${counter} articles found.`);
     });
// Route to Save a News Article
// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
     // TODO
     // ====
     // save the new note that gets posted to the Notes collection
     // then find an article from the req.params.id
     // and update it's "note" property with the _id of the new note
     db.Note.create(req.body, (err, data)=>{
       if(err) console.log(err);
       else{
         db.Article.findByIdAndUpdate(req.params.id, {$push: {note: data}}, (err, status)=>{
           if(err) console.log(err);
           else res.send(status);
         })
       }
     })
   });
// Route to Add Comment to an Article

// Route to Retrieve Comments to an Article

// Route to Delete Comments from an Article

// Route to Delete a Saved Article
