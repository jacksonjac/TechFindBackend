import mongoose from 'mongoose';
import { Chat } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (data: any) => {
        // console.log("Inside PostExit function for chat UPdate----:", data);

        try {
            const { Techid, Userid, type } = data;

            const userIdObjectId = new mongoose.Types.ObjectId(Userid as string);
            const techIdObjectId = new mongoose.Types.ObjectId(Techid as string);
            
            const result = await Chat.updateMany(
                {
                    user: userIdObjectId,
                    technician: techIdObjectId,
                    'messages.senderType': type,
                    'messages.seen': false // Target only messages that are not seen
                },
                {
                    $set: { 'messages.$[elem].seen': true } // Update the seen field to true for the targeted messages
                },
                {
                    arrayFilters: [{ 'elem.senderType': type, 'elem.seen': false }] // Apply the update only to messages with the specified senderType and that are not seen
                }
            );

            console.log('Update result:', result);

            return { status: true, data: result };
        } catch (error) {
            console.error("Error in PostExit function:", error);
            return { status: false, message: "An error occurred while updating messages." };
        }
    }
};