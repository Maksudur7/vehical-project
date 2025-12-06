import { NextFunction, Request, Response } from "express";

const adminAccess = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not funded'
        })
    }
    if (user.role !== "admin") {
        return res.status(401).json({
            success: false,
            message: 'Admin access required'
        })
    }
    next()
}

export default adminAccess;