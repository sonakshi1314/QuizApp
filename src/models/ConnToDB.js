const mongoose=require("mongoose");

  const questionSchema = new mongoose.Schema({
    QNo : Number,
    Question :String,
    Options : [String],
    correctAnswer : String
 })
 
 module.exports =  mongoose.model('generatequestions',questionSchema);