import { Request, Response } from "express";

export default (dependencies: any) => {
  const getOneQuestionByIdController = async (req: Request, res: Response) => {
    const { getOneQuestionById } = dependencies.useCase;
    const QuestionId = req.query.id; // Get the user ID from query parameters

    try {
      const response = await getOneQuestionById(dependencies).executeFunction(QuestionId);
      res.status(200).send(response);
    } catch (error) {
      console.error("Error in blockUserController:", error);
      res.status(500).send({ status: false, message: "An error occurred" });
    }
  };

  return getOneQuestionByIdController;
};
