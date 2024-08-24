import mongoose from 'mongoose';
import { Questions } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (QuestionId: string) => {
        console.log("Inside PostExit function with questionId:", QuestionId);
    
        try {
          // Find the question by QuestionId and delete it
          const deletedQuestion = await Questions.findOneAndDelete({ _id: QuestionId });
    
          if (!deletedQuestion) {
            return { status: false, message: "Question not found" };
          }
    
          console.log("Deleted Question:", deletedQuestion);
    
          // Return success status with deleted question data
          return { status: true, data: deletedQuestion };
        } catch (error) {
          console.error("Error in PostExit function:", error);
          // Return failure status with error message
          return { status: false, message: "An error occurred" };
        }
      }
  };