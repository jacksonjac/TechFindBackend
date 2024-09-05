import mongoose from 'mongoose';
import { Designation } from '../../Database'; // Ensure this path is correct

export default {
    PostExit: async (designationId: string, designationName: any) => {
        console.log("Inside UpdateDesignation function with designationId:", designationId);
        console.log("Data to update:", designationName);

        try {
            // Check if the designation exists in the database
            const designationExists = await Designation.findById(designationId);
            if (!designationExists) {
                console.error("Designation not found");
                return { status: false, message: "Designation not found" };
            }

            // Check if the new designation name already exists in another record
            const nameExists = await Designation.findOne({
                DesiName: designationName,
                _id: { $ne: designationId } // Exclude the current designation from this check
            });

            if (nameExists) {
                console.error("Designation name already exists");
                return { status: false, message: "Designation name already exists" };
            }

            // Find the designation by designationId and update specified fields
            const updatedDesignation = await Designation.findByIdAndUpdate(
                designationId,
                {
                    $set: {
                        DesiName: designationName // Update with the new designation name
                    }
                },
                { new: true } // To return the updated document
            );

            if (!updatedDesignation) {
                console.error("Failed to update the designation");
                return { status: false, message: "Failed to update the designation" };
            }

            console.log("Updated Designation:", updatedDesignation);

            // Return success status with updated designation data
            return { status: true, message: "Designation updated successfully", data: updatedDesignation };
        } catch (error) {
            console.error("Error in UpdateDesignation function:", error);
            // Return failure status with error message
            return { status: false, message: "An error occurred while updating the designation", error };
        }
    }
};
