import mongoose from 'mongoose';
import { Questions } from '../../Database';
import { Designation } from '../../Database'; // Ensure this path is correct

export default {
    PostExit: async (questionId: string, questionData: any) => {
        console.log("Inside UpdateQuestion function with questionId:", questionId);
        console.log("Data to update:", questionData);

        try {
            // Log the current questions to check if the ID exists
            const questionExists = await Questions.findById(questionId);
            if (!questionExists) {
                console.error("Question not found");
                return { status: false, message: "Question not found" };
            }
            console.log("Question exists before update:", questionExists);

            // Find the designation ID based on the designation name
            const designation = await Designation.findOne({ DesiName: questionData.designation });
            if (!designation) {
                console.error("Designation not found");
                return { status: false, message: "Designation not found" };
            }
            console.log("Designation found:", designation);

            // Find the question by questionId and update specified fields
            const updatedQuestion = await Questions.findByIdAndUpdate(
                questionId,
                {
                    $set: {
                        question: questionData.question,
                        option1: questionData.option1,
                        option2: questionData.option2,
                        option3: questionData.option3,
                        correctAnswer: questionData.correctAnswer,
                        designation: designation._id // Update with the designation ID
                    }
                },
                { new: true } // To return the updated document
            );

            if (!updatedQuestion) {
                console.error("Failed to update the question");
                return { status: false, message: "Failed to update the question" };
            }

            console.log("Updated Question:", updatedQuestion);

            // Return success status with updated question data
            return { status: true, message: "Question updated successfully", data: updatedQuestion };
        } catch (error) {
            console.error("Error in UpdateQuestion function:", error);
            // Return failure status with error message
            return { status: false, message: "An error occurred", error };
        }
    }
};
