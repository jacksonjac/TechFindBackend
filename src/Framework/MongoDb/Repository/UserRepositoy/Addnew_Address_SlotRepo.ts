import { Address } from "../../Database";
import { Slot } from "../../Database";
import { Bookings } from "../../Database";

export default {
  postExist: async (data: any) => {
    try {

      console.log("slot booked postexit")
      // Find the slot by its ID
      let slot = await Slot.findById(data.slotId);
      if (slot) {
        console.log("slot booked and add booked userid",slot)
        // Update the slot status to booked
        slot.booked = true;
        slot.bookedid = data.userId

        // Add new address
        const newAddress = new Address({
          fieldName: data.fieldName,
          district: data.district,
          pincode: data.pincode,
          houseName: data.houseName,
          phoneNumber: data.phoneNumber
        });

        const savedAddress = await newAddress.save();

        // Create new booking
        const newBooking = new Bookings({
          technicianId: slot.techId,
          addressId: savedAddress._id,
          slotId: slot._id,
          userId: data.userId,
          status: data.status,
          paymentMethod: data.paymentMethod,
          transactionStatus: data.transactionStatus,
          transactionId: data.transactionId,
          amount: data.amount
        });

        const savedBooking = await newBooking.save();

        // Update the slot with the new address ID
        slot.address = savedAddress._id;
        const updatedSlot = await slot.save();

        return {
          status: true,
          message: "Slot booked and address added successfully",
          data: {
            address: savedAddress,
            slot: updatedSlot,
            booking: savedBooking
          }
        };
      } else {
        return { status: false, message: "Slot not found" };
      }
    } catch (error) {
      console.error("Error in postExist:", error);
      return {
        status: false,
        message: "An error occurred during the process",
        error: error
      };
    }
  }
};
