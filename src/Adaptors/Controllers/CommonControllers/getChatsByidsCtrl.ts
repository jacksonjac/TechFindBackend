import { Request, Response } from "express";

export default (dependencies: any) => {
  const getChatsByidController = async (req: Request, res: Response) => {
    console.log("getChatsBy------idController");
    
    const { userid, techid } = req.query;

    const data = {
      Techid: techid,
      Userid: userid
    };
    
    console.log("data of chat IDs", data);

    const {GetAllChatsbyIds} = dependencies.useCase;

    try {
      const response = await GetAllChatsbyIds(dependencies).executeFunction(data);
      res.status(200).send(response);
    } catch (error) {
      console.error("Error fetching chats by IDs:", error);
      res.status(500).send({ message: "An error occurred while fetching chats." });
    }
  };

  return getChatsByidController;
};
