import { Request, Response } from "express";

export default (dependencies: any) => {
  const UpdateDesiCtrl = async (req: Request, res: Response) => {
    console.log("Reached update designation controller", req.body);

    const { UpdateDesignation } = dependencies.useCase;
    const DesiId = req.query.id; // Get the designation ID from query parameters
    const { Data } = req.body; // Destructure the data object from the request body
    const { DesiName } = Data; // Extract the DesiName from Data

    console.log("Constructed updatedQuestionData:", DesiId, DesiName);

    try {
      const response = await UpdateDesignation(dependencies).executeFunction(
        DesiId,
        DesiName
      );

      res.status(200).send(response);
    } catch (error) {
      console.error("Error in UpdateQuestionCtrl:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return UpdateDesiCtrl;
};
