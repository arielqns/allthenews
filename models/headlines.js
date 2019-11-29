var mongoose = require("mongoose");

// Reference for Schema constructor
var Schema = mongoose.Schema;

//  Schema constructor creates new object
var headlineSchema = new Schema({
 
  headline: {
    type: String,
    required: true,
    unique: true
  },
  reporterDate: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  }

});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", headlineSchema);

// Export the headline model
module.exports = Headline;