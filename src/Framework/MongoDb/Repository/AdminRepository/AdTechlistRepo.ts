import mongoose from 'mongoose';
import { Technican, Comment } from '../../Database'; // Adjust the path to your models

export default {
    PostExit: async () => {
        console.log("Inside PostExit function userlist");

        try {
            // Fetch all technicians from the database
            const Technicians = await Technican.find({}).populate('designation');

            if (Technicians.length > 0) {
                // Calculate the average rating for each technician
                const techniciansWithRatings = await Promise.all(
                    Technicians.map(async (technician) => {
                        const averageRating = await Comment.aggregate([
                            { $match: { technicianId: technician._id } }, // Match comments for this technician
                            {
                                $group: {
                                    _id: null,
                                    avgRating: { $avg: "$ratingValue" }, // Calculate the average rating
                                },
                            },
                        ]);

                        // Attach the average rating to the technician
                        return {
                            ...technician.toObject(),
                            averageRating: averageRating[0]?.avgRating || 0, // Default to 0 if no rating is found
                        };
                    })
                );

                console.log(techniciansWithRatings, "Technicians with ratings found");

                // Return technicians with ratings
                return { status: true, Data: techniciansWithRatings };
            } else {
                // If no technicians are found, return a message indicating this
                return { status: false, message: "No technicians found" };
            }
        } catch (error) {
            console.error("Error in PostExit function:", error);
            // Return a failure status with an error message
            return { status: false, message: "An error occurred" };
        }
    }
};
