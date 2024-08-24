import { Request, Response } from "express";

export default (dependencies: any) => {
  const DeleteQuestionController = async (req: Request, res: Response) => {
    const { DeleteQuestion } = dependencies.useCase;
    const QuestionId = req.query.id; // Get the user ID from query parameters

    try {
      const response = await DeleteQuestion(dependencies).executeFunction(
        QuestionId
      );
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in blockUserController:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return DeleteQuestionController;
};
