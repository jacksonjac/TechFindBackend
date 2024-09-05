import mongoose from 'mongoose';
import { User, Technican, Bookings, Designation } from '../../Database'; // Adjust the path to your models

export default {
  PostExit: async () => {
    try {
      // Fetch total number of users
      const totalUsers = await User.countDocuments();

      // Fetch total number of technicians
      const totalTechnicians = await Technican.countDocuments();

      // Fetch total number of bookings
      const totalBookings = await Bookings.countDocuments();

      // Calculate total revenue of the current month
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

      const monthlyRevenue = await Bookings.aggregate([
        {
          $match: {
            bookingDate: { $gte: startOfMonth, $lte: endOfMonth },
            transactionStatus: 'Success' // Only successful transactions
          }
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$amount' }
          }
        }
      ]);

      const totalRevenue = monthlyRevenue.length > 0 ? monthlyRevenue[0].totalRevenue : 0;

      // Fetch counts for specific designations separately
      const specificDesignations = ['Computer Technician', 'Ac Technician', 'Mobile Technician'];
      const designationCounts: Record<string, number> = {}; // Define the object type

      for (const designationName of specificDesignations) {
        // Find the designation ID by its name
        const designation = await Designation.findOne({ DesiName: designationName });
        if (designation) {
          // Count the technicians with this designation ID
          const count = await Technican.countDocuments({ designation: designation._id });
          designationCounts[designationName] = count;
        } else {
          // If designation is not found, set count to 0
          designationCounts[designationName] = 0;
        }
      }

      // Line graph data: count bookings for each day in the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const bookingsLast7Days = await Bookings.aggregate([
        {
          $match: {
            bookingDate: { $gte: sevenDaysAgo }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } } // Sort by date
      ]);

      // Prepare result data
      const technicianTypeCounts = specificDesignations.map(designationName => ({
        designationName,
        count: designationCounts[designationName]
      }));

      // Return the dashboard data
      return {
        status: true,
        data: {
          totalUsers,
          totalTechnicians,
          totalBookings,
          totalRevenue,
          technicianTypeCounts,
          bookingsLast7Days
        }
      };
    } catch (error) {
      console.error("Error in PostExit function:", error);
      return { status: false, message: "An error occurred" };
    }
  }
};
