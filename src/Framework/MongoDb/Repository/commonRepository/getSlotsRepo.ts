import mongoose from 'mongoose';
import { Slot } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (techid:any) => {
        console.log("Inside PostExit functionm  userlist");

        try {
             console.log(techid,"this is the techid for fetch slots")
            const Slots = await Slot.find({techId:techid});
            console.log(Slots, "Slots found");

            if (Slots.length > 0) {
                // If users are found, return them with a success status
                return { status: true, Data: Slots };
            } else {
                // If no users are found, return a message indicating this
                return { status: false, message: "No users found" };
            }
        } catch (error) {
            console.error("Error in PostExit function:", error);
            // Return a failure status with an error message
            return { status: false, message: "An error occurred" };
        }
    }
};