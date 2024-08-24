import { Request, Response } from "express";

export default (dependecies: any) => {
  const RoomidtoEmailController = async (req: Request, res: Response) => {
           console.log("sfkjsdlkfsjdflkjd ====")
           try {
            const { email, roomId } = req.body; // Extract email and roomId from the request body
            if (!email || !roomId) {
              return res.status(400).json({ message: 'Email and room ID are required' });
            }
      
            const { RoomidtoEmail } = dependecies.useCase;
      
            // Call the use case with the required dependencies and parameters
            const response = await RoomidtoEmail(dependecies).executeFunction(email, roomId);
      
            // Send the response from the use case back to the client
            res.status(200).json(response);
          } catch (error) {
            console.error("Error in RoomidtoEmailController:", error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        };

  return RoomidtoEmailController;
};