import mongoose from 'mongoose';
import { Questions } from '../../Database'; // Adjust the path to your Questions model

export default {
    PostExit: async () => {
        console.log("Inside getAllQuestions function");

        try {
            // Fetch all questions from the database
            const questions = await Questions.find({});
            console.log(questions, "Questions found");

            if (questions.length > 0) {
                // If questions are found, return them with a success status
                return { status: true, data: questions };
            } else {
                // If no questions are found, return a message indicating this
                return { status: false, message: "No questions found" };
            }
        } catch (error) {
            console.error("Error in getAllQuestions function:", error);
            // Return a failure status with an error message
            return { status: false, message: "An error occurred" };
        }
    }
};
