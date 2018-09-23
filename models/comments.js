const mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
  // `title` is of type String
  title: {
    type: String,
    required: true
  },
  // `body` is of type String
  text: {
    type: String, 
    required: true
  },
  // date created
  created: {
    type: Date,
    default: Date.now
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Articles",
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Comments= mongoose.model("Comment", CommentSchema);
module.exports = Comments;
