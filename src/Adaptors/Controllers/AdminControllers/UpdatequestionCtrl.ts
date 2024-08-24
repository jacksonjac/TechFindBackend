import { Request, Response } from "express";

export default (dependencies: any) => {
  const UpdateQuestionCtrl = async (req: Request, res: Response) => {
    const { UpdateQuestion } = dependencies.useCase;
    const userId = req.query.id; // Get the user ID from query parameters

    
  

    // Destructure the question data from the Data object in the request body
    const { Data } = req.body;
    const { question, option1, option2, option3, correctAnswer, designation } =
      Data;

    // Construct the updated question data object
    const updatedQuestionData = {
      question,
      option1,
      option2,
      option3,
      correctAnswer,
      designation,
    };

    console.log("this is update Question page",updatedQuestionData)

    // Log the constructed updatedQuestionData to debug
    

    try {
      // Pass the userId and updatedQuestionData to the use case function
      const response = await UpdateQuestion(dependencies).executeFunction(
        userId,
        updatedQuestionData
      );

      // Send the response back to the client
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in UpdateQuestionCtrl:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return UpdateQuestionCtrl;
};
