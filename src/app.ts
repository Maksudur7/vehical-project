import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRouter } from "./modules/api/v1/Authentication/auth.route";
import { vehiclesRouter } from "./modules/api/v1/Vehicles/vehicles.route";
import { userRouter } from "./modules/api/v1/Users/users.route";
import { bookingRouter } from "./modules/api/v1/Bookings/booking.router";
const app = express()

app.use(express.json())
initDB()

app.use("/api/v1", authRouter )
app.use("/api/v1", vehiclesRouter )
app.use("/api/v1", userRouter)
app.use("/api/v1", bookingRouter)

app.get('/', (req : Request, res: Response) => {
    res.send('Hello World!')
})

export default app