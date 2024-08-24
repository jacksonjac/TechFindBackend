import Userlistcontroller from "./Userlistcontroller";
import loginAdminCtrl from "./loginAdminCtrl";
import blockUsercontroller from "./blockUsercontroller";
import UnblockUsercontroller from "./UnblockUsercontroller";
import TechlistController from "./TechlistController";
import blockTechcontroller from "./blockTechcontroller";
import UnblockTechcontroller from "./UnblockTechcontroller";
import AddDesignationCtrl from "./AddDesignationCtrl";
import AddQuestionCtrl from "./AddQuestionCtrl";
import UpdatequestionCtrl from "./UpdatequestionCtrl";
import DeleteQuestionCtrl from "./DeleteQuestionCtrl";
import UpdateDesiController from "./UpdateDesiController";
import ApproveTechController from "./ApproveTechCtrl";
import RefuseTechController from "./RefuseTechCtrl";
import DeleteDesignationController from "./DeleteDesignationCtrl";
import getOneQuestionByIdCtrl from "./getOneQuestionByIdCtrl";
import getAdminDashboardCtrl from "./getAdminDashboardCtrl";


export default (dependencies: any) => {
  return {
    loginAdminCtrl: loginAdminCtrl(dependencies),
    Userlistcontroller: Userlistcontroller(dependencies),
    blockUsercontroller: blockUsercontroller(dependencies),
    UnblockUsercontroller: UnblockUsercontroller(dependencies),
    TechlistController: TechlistController(dependencies),
    blockTechcontroller: blockTechcontroller(dependencies),
    UnblockTechcontroller: UnblockTechcontroller(dependencies),
    AddDesignationController: AddDesignationCtrl(dependencies),
    AddQuestionCtrl: AddQuestionCtrl(dependencies),
    UpdatequestionCtrl: UpdatequestionCtrl(dependencies),
    DeleteQuestionCtrl: DeleteQuestionCtrl(dependencies),
    UpdateDesiController: UpdateDesiController(dependencies),
    ApproveTechController: ApproveTechController(dependencies),
    RefuseTechController: RefuseTechController(dependencies),
    DeleteDesignationController: DeleteDesignationController(dependencies),
    getOneQuestionByIdCtrl:getOneQuestionByIdCtrl(dependencies),
    getAdminDashboardCtrl:getAdminDashboardCtrl(dependencies)
    
  };
};
