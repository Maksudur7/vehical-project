import { Request, Response } from "express";
import { userService } from "./user.service";

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUser()
        res.status(201).json({
            success: true,
            message: "All usears are show",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.updateUser(req.body)
        res.status(201).json({
            success: true,
            message: "Usears are updated",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const deletUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.deletUser(req.params.id!)
        res.status(201).json({
            success: true,
            message: "All usears are show",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const userController = {
    getUser,
    updateUser,
    deletUser
}