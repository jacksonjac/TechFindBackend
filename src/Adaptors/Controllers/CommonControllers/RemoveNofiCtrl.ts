import { Request, Response } from "express";

export default (dependencies: any) => {
  const RemoveNotiController = async (req: Request, res: Response) => {
    const { RemoveNotification } = dependencies.useCase;
    const NotificationId = req.query.id; // Get the user ID from query parameters
     console.log('notification controller , noti id',NotificationId)
    try {
      const response = await RemoveNotification(dependencies).executeFunction(
        NotificationId
      );
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in blockUserController:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return RemoveNotiController;
};
