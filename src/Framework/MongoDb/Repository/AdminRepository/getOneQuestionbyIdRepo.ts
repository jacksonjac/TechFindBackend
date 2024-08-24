import mongoose from 'mongoose';
import { Questions } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (QuesitionId: string) => {
      console.log("Inside PostExit function with questionId:", QuesitionId);

      try {
        // Find the question by questionId
        const question = await Questions.findOne({ _id: QuesitionId });
  
        if (!question) {
          return { status: false, message: "Question not found" };
        }
  
        console.log("Found Question:", question);
  
        // Return success status with found question data
        return { status: true, data: question };
      } catch (error) {
        console.error("Error in PostExit function:", error);
        // Return failure status with error message
        return { status: false, message: "An error occurred" };
      }
    }
  };