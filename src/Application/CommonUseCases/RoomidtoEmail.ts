import { sendRoomidToEmail } from "../../Adaptors/Utilities/SentRoomidtoEmail";

export const RoomidtoEmail = (dependencies: any) => {
  console.log("techli by id business funtions");
 

  
    const executeFunction = async (email: string, roomId: string) => {
        try {
          // Send room ID to the specified email
          await sendRoomidToEmail(email, roomId);
    
          // Return success response
          return {
            status: true,
            message: 'Room ID sent to email successfully',
          };
        } catch (error) {
          // Handle any unexpected errors
          console.error('Error sending Room ID:', error);
          return {
            status: false,
            message: 'An error occurred while sending Room ID',
            data: null,
          };
        }
      };

  return { executeFunction };
    }

