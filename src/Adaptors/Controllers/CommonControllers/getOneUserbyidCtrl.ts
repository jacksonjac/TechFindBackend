import { Request, Response } from "express";

export default (dependencies: any) => {
  const getOneUserByIdController = async (req: Request, res: Response) => {

    
    const { getOneUserById } = dependencies.useCase;
    const UserId = req.query.id; // Get the user ID from query parameters

    try {
      const response = await getOneUserById(dependencies).executeFunction(UserId);
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in blockUserController:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return getOneUserByIdController;
};
