import { NextFunction, Request, Response } from "express";

const customerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const status = req.body.status;
    console.log(status);
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not funded'
        })
    }
    if (status !== 'active') {
        return next()
    }
    if (user.role === 'admin' || user.role === 'customer') {
        return next()
    }
    return res.status(403).json({
        success: false,
        message: "you are not eligble for this work "
    })
}

export default customerOrAdmin;