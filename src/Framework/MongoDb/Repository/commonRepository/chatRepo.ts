import mongoose from 'mongoose';
import { Chat } from '../../Database'; // Adjust the path to your Message model

export default {
  PostExit: async (chatData: any) => {
    // console.log("Inside PostExit function for chat store:", chatData);

    try {
      const { techid, userid, message } = chatData;

      // Find if a chat already exists between the user and the technician
      let chat = await Chat.findOne({ user: userid, technician: techid });

      // If chat doesn't exist, create a new chat document
      if (!chat) {
        chat = new Chat({
          user: userid,
          technician: techid,
          messages: []
        });
      }

      // Add the new message to the chat
      const newMessage = {
        senderType: message.SenderType.toLowerCase(),
        senderId: message.SenderId,
        content: message.content,
        createdAt: new Date()
      };

      chat.messages.push(newMessage);
      chat.lastMessage = newMessage

      // Save the chat document
      await chat.save();

      // Return success status with the created message data
      return { status: true, data: newMessage };
    } catch (error) {
      console.error("Error in PostExit function:", error);
      // Return failure status with error message
      return { status: false, message: "An error occurred" };
    }
  }
};
