import { Request, Response } from "express";

export default (dependecies: any) => {

  console.log("add designation controller")
  const AddDesignationControll = async (req: Request, res: Response) => {
    const { AddDesignation } = dependecies.useCase;

    const { designation } = req.body;

    const responce = await AddDesignation(dependecies).executeFunction(
      designation
    );

    res.send(responce);
  };

  return AddDesignationControll;
};
