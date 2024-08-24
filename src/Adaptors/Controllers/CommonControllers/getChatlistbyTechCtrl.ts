import { Request, Response } from "express";

export default (dependencies: any) => {
  const getChatsListbyTechidController = async (req: Request, res: Response) => {
    console.log("getChatsListByTech------idController");
    
    const id = req.query.id

 
    
    console.log("data of chat IDs", id);

    const {GetAllChatsListbyTechid} = dependencies.useCase;

    try {
      const response = await GetAllChatsListbyTechid(dependencies).executeFunction(id);
      res.status(200).send(response);
    } catch (error) {
      console.error("Error fetching chats by IDs:", error);
      res.status(500).send({ message: "An error occurred while fetching chats." });
    }
  };

  return getChatsListbyTechidController;
};
