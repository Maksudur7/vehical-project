import { Request, Response } from "express";
import { authService } from "./auth.service";

const regster = async (req: Request, res: Response) => {
    const { name, email, password, phone , role} = req.body;
    try {
        const result = await authService.regster(name, email, password, phone ,role)
        res.status(201).json({
            success: true,
            message: "Regster Successfull",
            data : result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const login = async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;
    try {
        const result = await authService.login(email, password)
        res.status(201).json({
            success: true,
            message: "login Successfull",
            data : result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const authController = {
    regster,
    login
}