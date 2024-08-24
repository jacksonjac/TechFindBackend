import { Request, Response } from "express";

export default (dependencies: any) => {
  const UnblockTechController = async (req: Request, res: Response) => {
    const { AdminUnblockTech } = dependencies.useCase;
    const userId = req.query.id; // Get the user ID from query parameters

    try {
      const response = await AdminUnblockTech(dependencies).executeFunction(
        userId
      );
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in blockUserController:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return UnblockTechController;
};
