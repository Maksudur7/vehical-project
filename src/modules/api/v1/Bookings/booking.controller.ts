import { Request, Response } from "express";
import { bookingServer } from "./booking.service";

const postBooking = async (req: Request, res: Response) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status } = req.body
    if (rent_end_date <= rent_start_date) {
        console.error("Error: rent_end_date must be greater than rent_start_date.");
        throw new Error("Invalid date range: End date must be after start date.");
    }

    try {
        const result = await bookingServer.postBooking(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
        res.status(201).json({
            success: true,
            message: "Booking Compleated",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const getBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingServer.getBooking()
        res.status(201).json({
            success: true,
            message: "All bookings are show",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const updateBooking = async (req: Request, res: Response) => {
    const { status } = req.body
    try {
        const result = await bookingServer.updateBooking(status, req.params.bookingId!)
        res.status(201).json({
            success: true,
            message: "Booking updated",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const bookingController = {
    postBooking,
    getBooking,
    updateBooking
}