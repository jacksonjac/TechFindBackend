import { Request, Response } from "express";

export default (dependencies: any) => {
  const ChatsUpdateController = async (req: Request, res: Response) => {
    console.log("getUpdateChatsBy------idController");
    
    const { userid, techid, senderType } = req.query;

    const data = {
      Techid: techid,
      Userid: userid,
      type:senderType

    };
    
    console.log("data of chat IDs", data);

    const {  UpdateChatseenbyIds} = dependencies.useCase;

    try {
      const response = await UpdateChatseenbyIds(dependencies).executeFunction(data);
      res.status(200).send(response);
    } catch (error) {
      console.error("Error fetching chats by IDs:", error);
      res.status(500).send({ message: "An error occurred while fetching chats." });
    }
  };

  return ChatsUpdateController;
};
