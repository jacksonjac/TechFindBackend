import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9\s?]*$/
  },
  option1: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9\s]*$/
  },
  option2: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9\s]*$/
  },
  option3: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9\s]*$/
  },
  correctAnswer: {
    type: String,
    required: true,
  
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designation',  // Reference to the Designation model
    required: true
  }
  });

  const Questions = mongoose.model('Questions', QuestionSchema);

export {
   Questions
}
  