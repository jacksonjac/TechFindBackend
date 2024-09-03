import mongoose from 'mongoose';
import { Technican, Bookings, Slot, Comment } from '../../Database'; // Adjust the path to your models

export default {
  PostExit: async (techid:any) => {
    try {
      // Get Technician Details
      const technician = await Technican.findById(techid);
      if (!technician) {
        return { status: false, message: "Technician not found" };
      }

      // Calculate total likes
      const totalLikes = technician.Likes || 0;

      // Calculate average rating
      const ratingResult = await Comment.aggregate([
        { $match: { technicianId: new mongoose.Types.ObjectId(techid) } },
        { $group: { _id: '$technicianId', averageRating: { $avg: '$ratingValue' } } }
      ]);
      const averageRating = ratingResult.length > 0 ? ratingResult[0].averageRating : 0;

      // Calculate helped customers (successful bookings)
      const helpedCustomers = await Bookings.countDocuments({
        technicianId: techid,
      });

      // Calculate total earnings
      const totalEarningsResult = await Bookings.aggregate([
        { $match: { technicianId: new mongoose.Types.ObjectId(techid), transactionStatus: 'Success' }},
        { $group: { _id: null, totalAmount: { $sum: '$amount' }}}
      ]);
      const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalAmount : 0;

      // Count pending, booked, and expired slots
      const pendingSlots = await Slot.countDocuments({ techId: techid, booked: false, date: { $gte: new Date() }});
      const bookedSlots = await Slot.countDocuments({ techId: techid, booked: true });
      const expiredSlots = await Slot.countDocuments({ techId: techid, date: { $lt: new Date() }});

      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      // Fetch earnings, helped customers, and pending slots count for the last 7 days
      const dailyStats = await Bookings.aggregate([
        {
          $match: {
            technicianId: new mongoose.Types.ObjectId(techid),
            bookingDate: { $gte: lastWeek, $lte: today }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" } },
            helpedCustomers: { $sum: 1 }, // Count the number of bookings per day
            dailyEarnings: { $sum: "$amount" } // Sum the earnings per day
          }
        },
        { $sort: { "_id": 1 } } // Sort by date
      ]);

      // Fetch pending slots count for the last 7 days
      const pendingSlotsByDay = await Slot.aggregate([
        {
          $match: {
            techId: new mongoose.Types.ObjectId(techid),
            booked: false,
            date: { $gte: lastWeek, $lte: today }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            pendingCount: { $sum: 1 } // Count the number of pending slots per day
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      // Define a type for merged data
      type MergedDataType = {
        [key: string]: {
          date: string;
          helpedCustomers: number;
          dailyEarnings: number;
          pendingCount: number;
        };
      };

      // Initialize mergedData with the correct type
      const mergedData: MergedDataType = {};

      dailyStats.forEach(item => {
        mergedData[item._id] = {
          date: item._id,
          helpedCustomers: item.helpedCustomers,
          dailyEarnings: item.dailyEarnings,
          pendingCount: 0 // Default value if no pending slots found for this date
        };
      });

      pendingSlotsByDay.forEach(item => {
        if (!mergedData[item._id]) {
          mergedData[item._id] = {
            date: item._id,
            helpedCustomers: 0, // Default value if no bookings found for this date
            dailyEarnings: 0,   // Default value if no earnings found for this date
            pendingCount: item.pendingCount
          };
        } else {
          mergedData[item._id].pendingCount = item.pendingCount;
        }
      });

      // Prepare the final user flow data
      const userFlow = {
        labels: Object.keys(mergedData),
        helpedCustomersData: Object.values(mergedData).map(item => item.helpedCustomers),
        dailyEarningsData: Object.values(mergedData).map(item => item.dailyEarnings),
        pendingSlotsData: Object.values(mergedData).map(item => item.pendingCount)
      };

      return {
        status: true,
        data: {
          totalLikes,
          averageRating,
          helpedCustomers,
          totalEarnings,
          userFlow,
          pendingSlots,
          bookedSlots,
          expiredSlots
        }
      };
    } catch (error) {
      console.error("Error in PostExit function:", error);
      return { status: false, message: "An error occurred" };
    }
  }
};
