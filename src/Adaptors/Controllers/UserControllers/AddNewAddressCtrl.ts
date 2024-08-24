import { Request, Response } from "express";


export default (dependencies: any) => {
  const Add_New_AddressController = async (req: Request, res: Response) => {


    console.log("this is addd new addresscontroller")
    const { AddNewAddress } = dependencies.useCase;
    const { fieldName, district, pincode, houseName, slotId, phoneNumber, userId, status, paymentMethod, transactionStatus, transactionId, amount } = req.body;

    try {
      const data = {
        fieldName,
        district,
        pincode,
        houseName,
        slotId,
        phoneNumber,
        userId,
        status,
        paymentMethod,
        transactionStatus,
        transactionId,
        amount
      };

      console.log("Data before passing execution function in controller add new function", data);

      const response = await AddNewAddress(dependencies).executeFunction(data);

      res.send(response);
    } catch (error) {
      res.status(500).send({ message: "Error adding new address", error });
    }
  };

  return Add_New_AddressController;
};
