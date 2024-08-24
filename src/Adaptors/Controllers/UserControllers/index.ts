import RegisterUserController from './RegisterUserController'
import loginUserController from './loginUserController'
import GoogleRegisterController from './GoogleRegisterController'
import VerifyidController from './VerifyidController'
import UserAddnewSlotCtrl from './UserAddnewSlotCtrl'
import AddNewAddressCtrl from './AddNewAddressCtrl'
import getSlotDataCtrl from './getSlotDataCtrl'
import getBookigbyUseridCtrl from './getBookigbyUseridCtrl'
import UserProfileUploadController from './UserImageUploadCtrl'
import AddNewCommentCtrl from './AddNewCommentCtrl'

export default (dependencies:any)=>{

   return {
      RegisterUserController: RegisterUserController(dependencies),
      loginUserController: loginUserController(dependencies),
      GoogleRegisterController: GoogleRegisterController(dependencies),
      VerifyidController: VerifyidController(dependencies),
      UserAddnewSlotCtrl:UserAddnewSlotCtrl(dependencies),
      AddNewAddressCtrl:AddNewAddressCtrl(dependencies),
      getSlotDataCtrl:getSlotDataCtrl(dependencies),
      getBookigbyUseridCtrl:getBookigbyUseridCtrl(dependencies),
      UserProfileUploadController:UserProfileUploadController(dependencies),
      AddNewCommentCtrl:AddNewCommentCtrl(dependencies),
      
      
  }

}