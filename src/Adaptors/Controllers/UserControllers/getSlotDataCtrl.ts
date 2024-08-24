import { Request, Response } from 'express';

export default (dependencies: any) => {
  const getSlotDataByidController = async (req: Request, res: Response) => {
    const slotId = req.query.Id; // Correctly extract the query parameter

    console.log("getSlotall Data", slotId);

    const { getSlotDatabyId } = dependencies.useCase;

    try {
      const response = await getSlotDatabyId(dependencies).executeFunction(slotId);
      res.send(response);
    } catch (error) {
      console.error('Error getting slot data:', error);
      res.status(500).send({ status: false, message: "An error occurred", error });
    }
  };

  return getSlotDataByidController;
};