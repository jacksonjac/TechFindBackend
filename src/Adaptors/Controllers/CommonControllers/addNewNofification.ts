import { Request, Response } from "express";

export default (dependecies: any) => {
    const addNewNotificationController = async (req: Request, res: Response) => {

        console.log("add notifiacation funtion")
        try {
          const { NotificationHandler } = dependecies.useCase;
    
          // Destructure the required fields from req.body
          const { content, technicianId, userid,date } = req.body;
    
          // Construct the data object to pass to the use case
          const data = {
            content,
            technicianId,
            userid,
            date
          };

          console.log("controller passing noti data",data)
    
          // Execute the use case with the provided dependencies and data
          const response = await NotificationHandler(dependecies).executeFunction(data);
    
          // Send the response back to the client
          res.status(200).json(response);
        } catch (error) {
          console.error('Error in addNewNotificationController:', error);
          res.status(500).json({ message: 'Failed to add new notification', error });
        }
      };

  return addNewNotificationController;
};
