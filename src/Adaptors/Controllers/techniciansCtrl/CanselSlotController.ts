import { Request, Response } from "express";

export default (dependencies: any) => {
    const CanselSlotController = async (req: Request, res: Response) => {
      const { CanselSlot} = dependencies.useCase;
      const SlotId = req.query.id; // Get the user ID from query parameters
  
      console.log("Inside verifycontroller techid with userId:", SlotId); // Log the userId
  
      try {
        const response = await CanselSlot(dependencies).executeFunction(SlotId);
        res.status(200).send(response);
      } catch (error) {
        console.error("Error in blockUserController:", error);
        res.status(500).send({ status: false, message: "An error occurred" });
      }
    };
  
    return CanselSlotController;
  };