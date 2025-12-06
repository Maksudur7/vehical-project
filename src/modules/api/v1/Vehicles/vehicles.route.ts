import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import jwtAuth from "../../../../middleware/jwtAuth";
import adminAccess from "../../../../middleware/adminAccess";

const route = Router()
route.post("/vehicles", jwtAuth , adminAccess,  vehicleController.postVehicles)
route.get("/vehicles", vehicleController.getVehicles )
route.get("/vehicles/:vehicleId", vehicleController.getSingleVehicles)
route.put("/vehicles/:vehicleId", jwtAuth, adminAccess, vehicleController.updatevehicles)
route.delete("/vehicles/:vehicleId", jwtAuth, adminAccess, vehicleController.deletVehicles)

export const vehiclesRouter = route;