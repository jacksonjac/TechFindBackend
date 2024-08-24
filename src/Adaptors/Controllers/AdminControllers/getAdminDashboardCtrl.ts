import { Request, Response } from "express";

export default (dependencies: any) => {
    const GetAdminDashboardController = async (req: Request, res: Response) => {
      const { GetAdminDashboardData} = dependencies.useCase;
     
  
     
  
      try {
        const response = await GetAdminDashboardData(dependencies).executeFunction();
        res.status(200).send(response);
      } catch (error) {
        console.error("Error in blockUserController:", error);
        res.status(500).send({ status: false, message: "An error occurred" });
      }
    };
  
    return GetAdminDashboardController;
  };