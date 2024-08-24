import express from "express";
import UserRouter from "./userRouters/UserRouter";
import technicianRouter from "./technicianRouters/technicianRouter";
import adminRouters from "./adminRouters/adminRouters";
import CommonRouters from "./commonRouters/CommonRouters";


export const routes = (dependencies: any) => {
  const routes = express.Router();

  

  routes.use("/user", UserRouter(dependencies));
  routes.use("/technician",technicianRouter(dependencies))
  routes.use("/admin",adminRouters(dependencies))
  routes.use('/common',CommonRouters(dependencies))


  // routes.use('/admin',UserRouter(dependencies))

  return routes;
};
