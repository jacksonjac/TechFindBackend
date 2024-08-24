import { Request, Response } from "express";

export default (dependecies: any) => {
  const UserAddnewSlotController = async (req: Request, res: Response) => {
    const { UserAddnewSlot } = dependecies.useCase;

    const slotData = req.body;

    // Log the slot data for debugging
    console.log("Received Slot Data:", slotData);

    // Create a data object to pass to the use case
    const data = {
      slotId: slotData._id,
      booked: slotData.booked,
      createdAt: slotData.createdAt,
      date: slotData.date,
      techId: slotData.techId,
      time: slotData.time,
      UserId:slotData.userId
    };

    console.log(data,"this is destrcture data")

    try {
      // Execute the use case function with the extracted data
      const response = await UserAddnewSlot(dependecies).executeFunction(data);

      // Send the response
      res.send(response);
    } catch (error) {
      // Handle errors and send error response
      console.error("Error executing UserAddnewSlot:", error);
      res.status(500).send({ error: "Failed to add new slot" });
    }
  };

  return UserAddnewSlotController;
};
