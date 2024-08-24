
import RegisterNewUserRepo from './UserRepositoy/RegisterNewUserRepo'
import loginNewUserRepo from './UserRepositoy/loginNewUserRepo'
import googlenewUserRepo from './UserRepositoy/googlenewUserRepo'
import { AddnewMeetingRepo, CanselSlotRepo,
         getAllMeetingsRepo,
         getDashboardbyidRepo,
         RegisterNewTechRepo,
         TechImageUploadRepo } from './TechnicianRepository'
import LogTechRepo from './TechnicianRepository/LogTechRepo'
import { ApproveTechRepo, DeleteDesiRepo, getAdminDashboardRepo, logAdminRepo } from './AdminRepository'
import {AdUserlistRepo} from './AdminRepository'
import {blockUserRepo} from './AdminRepository'
import {UnblockUserRepo} from  "./AdminRepository"
import { Addnew_Address_SlotRepo, addNewCommetRepo, getBookingsbyUseridRepo, getSlotsDatabyIdRepo, UserImageUploadRepo, VerifyIdRepo } from './UserRepositoy'
import {AdTechlistRepo} from './AdminRepository'
import {blockTechRepo} from './AdminRepository'
import {UnblockTechRepo} from './AdminRepository'
import {VerifyTechidRepo} from './TechnicianRepository'
import {AddDesignationRepo} from './AdminRepository'
import { chatRepo, getChatlistbyidRepo, getChatlistbyTechidRepo, getChatsByidRepo, getCommetsbyidRepo, getDesignationRepo, getNotificationbyidRepo, getOneUserbyidRepo, getSlotsRepo, notificationRepo, removenotiRepo, UpdatechatSeenRepo } from './commonRepository'
import {AddQuestionRepo} from './AdminRepository'
import {getAllQuestionRepo} from './commonRepository'
import { getQuestionByidRepo } from './commonRepository'
import {UpdateQuesitonRepo} from './AdminRepository'
import {DeleteQuestionRepo} from './AdminRepository'
import {getTechbyIdRepo} from './commonRepository'
import {UpdateDesiRepo} from './AdminRepository'
import {RefuseTechRepo} from './AdminRepository'
import {GetTechbyIdRepo} from './TechnicianRepository'
import {getOneQuestionbyIdRepo}from './AdminRepository'
import {getOneTechbyIdRepo} from './commonRepository'
import {AddnewSlotRepo} from './TechnicianRepository'
import {UserAddnewSlotRepo} from './UserRepositoy'


export {
    RegisterNewUserRepo,
    loginNewUserRepo,
    googlenewUserRepo,
    RegisterNewTechRepo,
    LogTechRepo,
    logAdminRepo,
    AdUserlistRepo,
    blockUserRepo,
    UnblockUserRepo,
    VerifyIdRepo,
    AdTechlistRepo,
    blockTechRepo,
    UnblockTechRepo,
    VerifyTechidRepo,
    AddDesignationRepo,
    getDesignationRepo,
    AddQuestionRepo,
    getAllQuestionRepo,
    getQuestionByidRepo,
    UpdateQuesitonRepo,
    DeleteQuestionRepo,
    getTechbyIdRepo,
    UpdateDesiRepo,
    ApproveTechRepo,
    RefuseTechRepo,
    DeleteDesiRepo,
    GetTechbyIdRepo,
    getOneQuestionbyIdRepo,
    getOneTechbyIdRepo,
    AddnewSlotRepo,
    getSlotsRepo,
    UserAddnewSlotRepo,
    Addnew_Address_SlotRepo,
    getSlotsDatabyIdRepo,
    getBookingsbyUseridRepo,
    CanselSlotRepo,
    UserImageUploadRepo,
    chatRepo,
    getChatsByidRepo,
    getChatlistbyidRepo,
    getChatlistbyTechidRepo,
    getOneUserbyidRepo,
    TechImageUploadRepo,
    addNewCommetRepo,
    getCommetsbyidRepo,
    notificationRepo,
    getNotificationbyidRepo,
    getDashboardbyidRepo,
    getAdminDashboardRepo,
    removenotiRepo,
    AddnewMeetingRepo,
    getAllMeetingsRepo,
    UpdatechatSeenRepo
}