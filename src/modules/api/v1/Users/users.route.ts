import { Router } from "express";
import { userController } from "./users.controller";
import jwtAuth from "../../../../middleware/jwtAuth";
import adminAccess from "../../../../middleware/adminAccess";

const route = Router()

route.get("/users", jwtAuth, adminAccess, userController.getUser)
route.put("/users/:userId", jwtAuth, userController.updateUser ) // admin and own
route.delete("/users/:userId", jwtAuth, adminAccess, userController.deletUser)

export const userRouter = route; 