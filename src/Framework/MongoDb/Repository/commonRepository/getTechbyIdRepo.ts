import mongoose from 'mongoose';
import { Technican } from '../../Database'; // Adjust the path to your Questions model

export default {
    PostExit: async (DesiId: any) => {
        console.log("Inside getAllTechbyId function");

        try {
            // Fetch questions by designation ID from the database
            const technicians = await Technican.find({ designation: DesiId })
            .populate('designation');
           

            if (technicians.length > 0) {
                // If questions are found, return them with a success status
                return { status: true, data: technicians };
            } else {
                // If no questions are found, return a message indicating this
                return { status: false, message: "No questions found for the given designation ID" };
            }
        } catch (error) {
            console.error("Error in getAllQuestionsById function:", error);
            // Return a failure status with an error message
            return { status: false, message: "An error occurred while fetching questions" };
        }
    }
};