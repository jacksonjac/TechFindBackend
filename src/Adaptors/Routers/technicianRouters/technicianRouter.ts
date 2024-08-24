import express from "express";

import techniciansControllers from "../../Controllers/techniciansCtrl";
import multer from '../../Utilities/multer';

export default (dependencies: any) => {
  const { 
           RegisterTechController,LogintechinicianController,VerifyidController,GetTechbyidCtrl,CanselSlotController,

                 AddnewSlotCtrl,TechImageUpload,getDashboardCtrl,AddnewMeetingCtrl,getAllMeetingsCtrl} = techniciansControllers(dependencies);
                 
  
  
  const router = express.Router();

  router.post("/newTech", RegisterTechController);
  router.post('/newTechlogin',LogintechinicianController)
  router.put('/verify',VerifyidController)
  router.get('/GetTechDatabyId',GetTechbyidCtrl)
  router.post('/newSlot',AddnewSlotCtrl),
  router.put('/canselSlot',CanselSlotController),
  router.get('/DashboardData',getDashboardCtrl)
  router.post('/UploadImage', multer.single('image'), TechImageUpload);
  router.post('/SchedulenewMeeting',AddnewMeetingCtrl),
  router.get('/MeetingList',getAllMeetingsCtrl)

  

  return router;
};
