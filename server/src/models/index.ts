import Question from './Question.js';
import QuestionSchema from './Question.js';
import mongoose from 'mongoose';
import QuestionModel from './Question.js';


//export default { Question };

const models = {
    Question: {
      db: mongoose.connection, // Assuming you're using Mongoose for MongoDB
      model: QuestionModel,    // The actual Mongoose model
    },
  };


export default { Question, QuestionSchema, models };