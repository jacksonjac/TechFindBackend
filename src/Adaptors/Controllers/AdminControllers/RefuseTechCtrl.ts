import { Request, Response } from "express";

export default (dependencies: any) => {
  const RefuseTechController = async (req: Request, res: Response) => {
    const { AdminRefuseTech } = dependencies.useCase;
    const TechId = req.query.id; // Get the user ID from query parameters

   

    try {
      const response = await AdminRefuseTech(dependencies).executeFunction(
        TechId
      );
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in blockUserController:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return RefuseTechController;
};
