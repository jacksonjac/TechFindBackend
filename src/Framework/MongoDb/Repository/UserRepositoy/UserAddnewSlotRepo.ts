import { User } from "../../Database";
import { Technican } from "../../Database";

export default {
  postExist: async (data: any) => {
    try {
      console.log(data, "this is the data of post method");

      // Find the user with the provided userId
      const user = await User.findById(data.UserId);

      // Find the technician with the provided techId
      const technician = await Technican.findById(data.techId);

      if (user && technician) {
        console.log(data.slotId, "this is the slotid of user booked slot");

        // Push the slot ID to the user's slots array
        user.slots.push(data.slotId);

        // Save the updated user document
        await user.save();

        // Return success response with full technician details
        return {
          status: true,
          message: "Slot added to user successfully",
          technician
        };
      } else {
        // If no user or technician is found, return a failure status
        if (!user) {
          return { status: false, message: "User not found" };
        } else {
          return { status: false, message: "Technician not found" };
        }
      }
    } catch (error) {
      console.error("Error in postExist:", error);
      return { status: false, message: "An error occurred while adding slot to user", error: error };
    }
  }
};