import { NextFunction, Request, Response } from "express";

const rolebaseGet = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not funded'
        })
    }

    if(user.role === 'admin'){
        req.query.viewAll = "true";
        return next()
    }
    if(user.role === 'customer'){
        req.query.userId = user.id
        return next()
    }

}
export default rolebaseGet