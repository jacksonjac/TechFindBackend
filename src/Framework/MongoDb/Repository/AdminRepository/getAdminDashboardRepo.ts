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
      const designationCounts: Record<string, number> = {};

      for (const designationName of specificDesignations) {
        const designation = await Designation.findOne({ DesiName: designationName });
        if (designation) {
          const count = await Technican.countDocuments({ designation: designation._id });
          designationCounts[designationName] = count;
        } else {
          designationCounts[designationName] = 0;
        }
      }

      // Get last 7 days data with all days included
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Subtract 6 days to include today

      const bookingsData = await Bookings.aggregate([
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
        { $sort: { _id: 1 } }
      ]);

      // Generate an array with the last 7 days as strings
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
      }).reverse();

      // Merge the data from MongoDB with the last 7 days array
      const bookingsLast7Days = last7Days.map(date => {
        const booking = bookingsData.find(b => b._id === date);
        return {
          date,
          count: booking ? booking.count : 0
        };
      });

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
