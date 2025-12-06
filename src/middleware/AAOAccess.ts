import { NextFunction, Request, Response } from "express";

const AAOAccess = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const own = req.params.userId
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not funded'
        })
    }
    if (user.role === "admin") {
        return next()
    }

    if (user.id === parseInt(own as string)) {
        return next()
    }

    return res.status(403).json({
        success : false,
        message : "you can update only your profile"
    })
}

export default AAOAccess;