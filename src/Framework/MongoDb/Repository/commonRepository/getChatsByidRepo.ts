import mongoose from 'mongoose';
import { Chat } from '../../Database'; // Adjust the path to your Admin model

export default {
    PostExit: async (data: any) => {
        console.log("Inside PostExit function for chat store:", data);

        try {
            // Extract techid and userid from data
            const { Techid, Userid } = data;

            // Find the chat document that matches the techid and userid
            const chat = await Chat.findOne({
                user: Userid,
                technician: Techid
            });

            if (chat) {
                // If chat is found, return the messages with a success status
                
                return { status: true, Data: chat.messages };
            } else {
                // If no chat is found, return a message indicating this
                console.log("No chat found");
                return { status: false, message: "Chat not found" };
            }
        } catch (error) {
            console.error("Error in PostExit function:", error);
            // Return a failure status with an error message
            return { status: false, message: "An error occurred while fetching chats." };
        }
    }
};