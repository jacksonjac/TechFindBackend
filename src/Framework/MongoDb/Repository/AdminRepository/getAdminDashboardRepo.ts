import mongoose from 'mongoose';
import { Technican, User } from '../../Database'; // Adjust the path to your models

export default {
  PostExit: async () => {
    try {
      // Fetch total number of users
      const totalUsers = await User.countDocuments();

      // Fetch total number of technicians
      const totalTechnicians = await Technican.countDocuments();

      // Return the total counts
      return {
        status: true,
        data: {
          totalUsers,
          totalTechnicians
        }
      };
    } catch (error) {
      console.error("Error in PostExit function:", error);
      return { status: false, message: "An error occurred" };
    }
  }
};
