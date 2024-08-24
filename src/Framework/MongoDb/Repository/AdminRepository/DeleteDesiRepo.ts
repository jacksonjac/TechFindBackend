import mongoose from 'mongoose';
import { Designation } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (DesiId: string) => {
        console.log("Inside PostExit function with questionId:", DesiId);
    
        try {
          // Find the question by QuestionId and delete it
          const deletedQuestion = await Designation.findOneAndDelete({ _id: DesiId });
    
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