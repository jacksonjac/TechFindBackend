import { Request, Response } from "express";

export default (dependencies: any) => {
  const AddQuestionController = async (req: Request, res: Response) => {
    const { AddQuestion } = dependencies.useCase;

   
    const { question, option1, option2, option3, correctAnswer, designation } =
      req.body;

    
    const data = {
      question,
      option1,
      option2,
      option3,
      correctAnswer,
      designation,
    };

    try {
      // Call the use case function with the prepared data
      const response = await AddQuestion(dependencies).executeFunction(data);
      res.send(response);
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while adding the question." });
    }
  };

  return AddQuestionController;
};
