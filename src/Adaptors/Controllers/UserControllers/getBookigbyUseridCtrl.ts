import { Request, Response } from 'express';

export default (dependencies: any) => {
  const getBookingsDataByidController = async (req: Request, res: Response) => {
    const UserId = req.query.Id; // Correctly extract the query parameter

    console.log("getbookingsall Data", UserId);

    const { getBookingsbyUserId } = dependencies.useCase;

    try {
      const response = await getBookingsbyUserId(dependencies).executeFunction(UserId);
      res.send(response);
    } catch (error) {
      console.error('Error getting slot data:', error);
      res.status(500).send({ status: false, message: "An error occurred", error });
    }
  };

  return getBookingsDataByidController;
};