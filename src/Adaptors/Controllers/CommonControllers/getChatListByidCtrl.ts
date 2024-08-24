import { Request, Response } from "express";

export default (dependencies: any) => {
  const getChatsListbyidController = async (req: Request, res: Response) => {
    console.log("getChatsListBy------idController");
    
    const id = req.query.id

 
    
    console.log("data of chat IDs", id);

    const {GetAllChatsListbyid} = dependencies.useCase;

    try {
      const response = await GetAllChatsListbyid(dependencies).executeFunction(id);
      res.status(200).send(response);
    } catch (error) {
      console.error("Error fetching chats by IDs:", error);
      res.status(500).send({ message: "An error occurred while fetching chats." });
    }
  };

  return getChatsListbyidController;
};
