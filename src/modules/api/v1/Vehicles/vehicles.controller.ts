import { Request, Response } from "express";
import { vehicleSearvices } from "./vehicles.service";

const postVehicles = async (req: Request, res: Response) => {

    const { vehicle_name, type, registration_number, daily_rent_price,
        availability_status
    } = req.body;
    try {
        const result = await vehicleSearvices.postVehicles(vehicle_name, type, registration_number, daily_rent_price,
            availability_status);
        res.status(201).json({
            success: true,
            message: "Vehicle Insearted Successfull",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleSearvices.getVehicles()
        res.status(201).json({
            success: true,
            message: "All Vehicles are show",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getSingleVehicles = async (req: Request, res: Response) => {

    try {
        const result = await vehicleSearvices.getSingleVehicles(req.params.vehicleId!)
        res.status(201).json({
            success: true,
            message: "single vehicles are ready",
            data: result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const updatevehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleSearvices.updatevehicles(req.body, req.params.vehicleId!)
        res.status(201).json({
            success: true,
            message: "vehicles are updated",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const deletVehicles = async (req: Request, res: Response) => {
    console.log(req.params.vehicleId);
    try {
        const result = await vehicleSearvices.deletVehicles(req.params.vehicleId!)
        res.status(201).json({
            success: true,
            message: "Deleted this vehicle",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const vehicleController = {
    postVehicles,
    getVehicles,
    getSingleVehicles,
    updatevehicles,
    deletVehicles
}