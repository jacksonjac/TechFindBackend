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

      // Generate user flow data (dummy data or from logs)
      const userFlow = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        data: [120, 150, 80, 70, 90, 110, 95] // Placeholder data
      };

      // Count pending, booked, and expired slots
      const pendingSlots = await Slot.countDocuments({ techId: techid, booked: false, date: { $gte: new Date() }});
      const bookedSlots = await Slot.countDocuments({ techId: techid, booked: true });
      const expiredSlots = await Slot.countDocuments({ techId: techid, date: { $lt: new Date() }});

      // Return the calculated data
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
