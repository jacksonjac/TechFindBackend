import mongoose from 'mongoose';
import { Chat } from '../../Database'; // Adjust the path to your Admin model
import { User } from '../../Database';

export default {
    PostExit: async (TechId: any) => {
        console.log("Inside PostExit function for chat store:", TechId);
    
        try {
          // Find all chat documents for the specified user
          const chats = await Chat.find({ technician: TechId }).populate('user', 'name  _id image'); // Assuming technician is a reference
                     console.log(chats,"all chats")
          if (chats) {
            // Extract unique technicians
            
    
          ;
    
            return { status: true, data: chats };
          } else {
            // If no chats are found, return a message indicating this
            console.log("No chats found");
            return { status: false, message: "No chats found for the user" };
          }
        } catch (error) {
          console.error("Error in PostExit function:", error);
          // Return a failure status with an error message
          return { status: false, message: "An error occurred while fetching chats." };
        }
      }
};