import express from "express";
import UserControllers from "../../Controllers/UserControllers";
import multer from '../../Utilities/multer';

export default (dependencies: any) => {
  const { RegisterUserController,
           loginUserController,
           GoogleRegisterController,
           VerifyidController,
           UserAddnewSlotCtrl,
           AddNewAddressCtrl,
           getSlotDataCtrl,
           getBookigbyUseridCtrl,UserProfileUploadController,AddNewCommentCtrl
                 } = UserControllers(dependencies);


  const router = express.Router();

  router.post("/newUser", RegisterUserController);
  router.post("/newLogin", loginUserController);
  router.post("/GoogleRegister",GoogleRegisterController)
  router.get("/verify",VerifyidController)
  router.post("/addNewSlot",UserAddnewSlotCtrl)
  router.post("/Add_newAdrres",AddNewAddressCtrl);
  router.get("/AppoinmentById",getSlotDataCtrl)
  router.get("/BookingsById",getBookigbyUseridCtrl)
  router.post('/Upload', multer.single('image'), UserProfileUploadController);
  router.post("/Add_newComment",AddNewCommentCtrl);

  return router;
};
