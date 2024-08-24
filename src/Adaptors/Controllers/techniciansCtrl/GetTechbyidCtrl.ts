import { Request, Response } from "express";

export default (dependencies: any) => {
    const GetTechIdController = async (req: Request, res: Response) => {
      const { GetTechById} = dependencies.useCase;
      const techId = req.query.id; // Get the user ID from query parameters
  
      console.log("Inside get data techid with userId:", techId); // Log the userId
  
      try {
        const response = await GetTechById(dependencies).executeFunction(techId);
        res.status(200).send(response);
      } catch (error) {
        console.error("Error in blockUserController:", error);
        res.status(500).send({ status: false, message: "An error occurred" });
      }
    };
  
    return GetTechIdController;
  };