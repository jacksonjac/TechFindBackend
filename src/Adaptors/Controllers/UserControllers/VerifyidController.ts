import { Request, Response } from "express";

export default (dependencies: any) => {
    const VerifyIdController = async (req: Request, res: Response) => {
      const { VerifyUser} = dependencies.useCase;
      const userId = req.query.id; // Get the user ID from query parameters
  
      console.log("Inside verifycontroller userid with userId:", userId); // Log the userId
  
      try {
        const response = await VerifyUser(dependencies).executeFunction(userId);
        res.status(200).send(response);
      } catch (error) {
        console.error("Error in blockUserController:", error);
        res.status(500).send({ status: false, message: "An error occurred" });
      }
    };
  
    return VerifyIdController;
  };