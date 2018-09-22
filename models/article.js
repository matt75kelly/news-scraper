const mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    default: ''
  },
  // date of when it was first brought into collection
  scrapedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  isSaved: {
    type: Boolean,
    required: true,
    default: false,
  },
  // `comment` is an object that stores a comment id
  // The ref property links the ObjectId to the comment model
  // This allows us to populate the Article with an associated comment
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Articles = mongoose.model("Article", ArticleSchema);

module.exports = Articles
