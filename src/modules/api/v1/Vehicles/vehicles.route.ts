import { Router } from "express";
import { vehicleController } from "./vehicles.controller";

const route = Router()
route.post("/vehicles", vehicleController.postVehicles)
route.get("/vehicles", vehicleController.getVehicles )
route.get("/vehicles/:vehicleId", vehicleController.getSingleVehicles)
route.put("/vehicles/:vehicleId", vehicleController.updatevehicles)
route.put("/vehicles/:vehicleId", vehicleController.deletVehicles)

export const vehiclesRouter = route;