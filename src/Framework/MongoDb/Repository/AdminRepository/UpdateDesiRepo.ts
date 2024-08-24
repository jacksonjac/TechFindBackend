import mongoose from 'mongoose';

import { Designation } from '../../Database'; // Ensure this path is correct

export default {
    PostExit: async (designationId: string, designation: any) => {
        console.log("Inside UpdateQuestion function with questionId:", designationId);
        console.log("Data to update:", designation);

        try {
            // Log the current questions to check if the ID exists
            const DesignationExists = await Designation.findById(designationId);
            if (DesignationExists) {
                console.error("Designation is  not found");
                return { status: false, message: "Designation not found" };
            }
           

            // Find the question by questionId and update specified fields
            const updatedQuestion = await Designation.findByIdAndUpdate(
                designationId,
                {
                    $set: {
                          
                        DesiName: designation
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
