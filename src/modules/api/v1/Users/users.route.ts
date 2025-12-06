import { Router } from "express";
import { userController } from "./users.controller";
import adminAccess from "../../../../middleware/adminAccess";
import AAOAccess from "../../../../middleware/AAOAccess";
import jwtAuth from "../../../../middleware/jwtAuth";

const route = Router()

route.get("/users", jwtAuth, adminAccess, userController.getUser)
route.put("/users/:userId", jwtAuth, AAOAccess, userController.updateUser ) 
route.delete("/users/:userId", jwtAuth, adminAccess, userController.deletUser)

export const userRouter = route; 