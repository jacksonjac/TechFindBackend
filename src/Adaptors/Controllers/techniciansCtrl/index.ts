import technicianRegisterController from './technicianRegisterController'
import logintechinician from './logintechinicianController'
import VerifyIdcontroller from './VerifyIdcontroller'
import GetTechbyidCtrl from './GetTechbyidCtrl'
import AddnewSlotCtrl from './AddnewSlotCtrl'
import CanselSlotController from './CanselSlotController'
import TechImageUpload from './TechImageUpload'
import getDashboardCtrl from './getDashboardCtrl'
import AddnewMeetingCtrl from './AddnewMeetingCtrl'
import getAllMeetingsCtrl from './getAllMeetingsCtrl'


export default (dependencies:any)=>{

 return {
    RegisterTechController:technicianRegisterController(dependencies),
    LogintechinicianController:logintechinician(dependencies),
    VerifyidController:VerifyIdcontroller(dependencies),
    GetTechbyidCtrl:GetTechbyidCtrl(dependencies),
    AddnewSlotCtrl:AddnewSlotCtrl(dependencies),
    CanselSlotController:CanselSlotController(dependencies),
    TechImageUpload:TechImageUpload(dependencies),
    getDashboardCtrl:getDashboardCtrl(dependencies),
    AddnewMeetingCtrl:AddnewMeetingCtrl(dependencies),
    getAllMeetingsCtrl:getAllMeetingsCtrl(dependencies)

    
 }

}