import { Router } from "express";
import { userController } from "./users.controller";

const route = Router()

route.get("/users", userController.getUser)
route.put("/users/:userId", userController.updateUser )
route.delete("/users/:userId", userController.deletUser)

export const userRouter = route; 