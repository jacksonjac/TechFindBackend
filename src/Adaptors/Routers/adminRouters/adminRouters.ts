import express from "express";
import AdminControllers from "../../Controllers/AdminControllers";


export default (dependencies: any) => {
  const {loginAdminCtrl,Userlistcontroller,
         blockUsercontroller,UnblockUsercontroller,
         TechlistController,blockTechcontroller,
         UnblockTechcontroller,AddDesignationController,AddQuestionCtrl,UpdatequestionCtrl,DeleteQuestionCtrl,
         UpdateDesiController,ApproveTechController,RefuseTechController,DeleteDesignationController,getOneQuestionByIdCtrl,getAdminDashboardCtrl} = AdminControllers(dependencies);

  const router = express.Router();

  router.put('/blockuser', blockUsercontroller); 
  router.post('/Adminlogin', loginAdminCtrl);
  router.get('/userlist', Userlistcontroller);
  router.post('/AddDesignation',AddDesignationController)
  router.post('/NewQuestion',AddQuestionCtrl)
  router.get('/techlist', TechlistController);
  router.put('/Unblockuser', UnblockUsercontroller); 
  router.put('/blockTech', blockTechcontroller); 
  router.put('/UnblockTech', UnblockTechcontroller); 
  router.put('/UpdateQuestion',UpdatequestionCtrl)
  router.put('/DeleteQuestion',DeleteQuestionCtrl)
  router.put('/UpdateDesignation',UpdateDesiController)
  router.put('/ApproveTech', ApproveTechController); 
  router.put('/DeniedTech', RefuseTechController); 
  router.put('/DeleteDesignation',DeleteDesignationController)
  router.get('/getOneQuestionbyId',getOneQuestionByIdCtrl)
  router.get('/getAdminDashboard',getAdminDashboardCtrl)

 

  
  

  return router;
};
