import { Request, Response } from "express";

export default (dependencies: any) => {
  const RefreshtokenController = async (req: Request, res: Response) => {
    const { RefreshToken } = dependencies.useCase;
    
     console.log('refrershtoken controlere , noti id')
    try {
      const response = await RefreshToken(dependencies).executeFunction();
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in blockUserController:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return RefreshtokenController;
};
