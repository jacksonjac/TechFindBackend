import { Request, Response } from "express";

export default (dependencies: any) => {
    const GetDashboardController = async (req: Request, res: Response) => {
      const { GetDashboardData} = dependencies.useCase;
      const techId = req.query.id; // Get the user ID from query parameters
  
      console.log("Inside get data techid Dashboard with userId:", techId)
  
      try {
        const response = await GetDashboardData(dependencies).executeFunction(techId);
        res.status(200).send(response);
      } catch (error) {
        console.error("Error in blockUserController:", error);
        res.status(500).send({ status: false, message: "An error occurred" });
      }
    };
  
    return GetDashboardController;
  };