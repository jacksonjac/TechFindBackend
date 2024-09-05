import { Request, Response } from "express";

export default (dependencies: any) => {
  const DeleteDesignationController = async (req: Request, res: Response) => {

    console.log("reach delet Designation ",req.body.id)
    const { DeleteDesignation } = dependencies.useCase;
    const DesignationId = req.query.id; // Get the user ID from query parameters

    try {
      const response = await DeleteDesignation(dependencies).executeFunction(
        DesignationId
      );
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in blockUserController:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return DeleteDesignationController;
};
