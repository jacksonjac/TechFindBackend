import mongoose from 'mongoose';
import { Technican } from '../../Database'; 
import { Slot } from '../../Database';
import { Address } from '../../Database';
import { Bookings } from '../../Database';

export default {
  PostExit: async (UserId: string) => {
    console.log("Inside PostExit function with UserId:", UserId);

    try {
      // Find all bookings by userId and populate slot and address data
      const bookings = await Bookings.find({ userId: UserId })
        .populate('slotId')
        .populate('addressId')
        .populate('technicianId')

      if (!bookings || bookings.length === 0) {
        return { status: false, message: "No bookings found for this user" };
      }

      // Find related slot and technician data for each booking
      const responseData = await Promise.all(bookings.map(async (booking) => {
        // Find the slot by slotId
        const slot = await Slot.findOne({ _id: booking.slotId });

        if (!slot) {
          return { status: false, message: `Slot not found for booking ${booking._id}` };
        }

        // Find the technician by techId from the slot
        const technician = await Technican.findOne({ _id: slot.techId });

        if (!technician) {
          return { status: false, message: `Technician not found for slot ${slot._id}` };
        }

        return {
          slot,
          technician,
          booking
        };
      }));

      // Return success status with combined data
      return { status: true, data: bookings };
    } catch (error) {
      console.error("Error in PostExit function:", error);
      // Return failure status with error message
      return { status: false, message: "An error occurred" };
    }
  }
};
