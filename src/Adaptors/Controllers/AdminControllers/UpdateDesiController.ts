import { Request, Response } from "express";

export default (dependencies: any) => {
  const UpdateDesiCtrl = async (req: Request, res: Response) => {
    const { UpdateDesignation } = dependencies.useCase;
    const DesiId = req.query.id; // Get the user ID from query parameters

    

    // Destructure the question data from the Data object in the request body
    const { Data } = req.body;
    const { DesiName } = Data;

    // Construct the updated question data object

    // Log the constructed updatedQuestionData to debug
    console.log("Constructed updatedQuestionData:", DesiId, DesiName);

    try {
      // Pass the userId and updatedQuestionData to the use case function
      const response = await UpdateDesignation(dependencies).executeFunction(
        DesiId,
        DesiName
      );

      // Send the response back to the client
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in UpdateQuestionCtrl:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return UpdateDesiCtrl;
};
