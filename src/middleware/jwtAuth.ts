import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from '../config';


const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Token not provided'
        })
    }

    try {
        const decode = jwt.verify(token!, config.secret_key as string) as JwtPayload
        req.user = decode;
        next()
    } catch (err: any) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

export default jwtAuth;