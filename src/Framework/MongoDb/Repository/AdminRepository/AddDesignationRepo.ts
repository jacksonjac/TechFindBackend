import mongoose from 'mongoose';
import { Designation } from '../../Database'; // Adjust the path to your Designation model

export default {
    PostExit: async (designation: string) => {
        console.log("Inside PostExit function");

        try {
            // Check if the designation already exists
            const existingDesignation = await Designation.findOne({ DesiName: designation });
            if (existingDesignation) {
                return { status: false, message: "Designation already exists" };
            }

            // Create a new designation
            const newDesignation = new Designation({ DesiName: designation });
            await newDesignation.save();

            return { status: true, message: "Designation successfully added" };
        } catch (error) {
            console.error("Error in PostExit function:", error);
            return { status: false, message: "An error occurred" };
        }
    }
};
