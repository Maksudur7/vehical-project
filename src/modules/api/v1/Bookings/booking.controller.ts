import { Request, Response } from "express";
import { bookingServer } from "./booking.service";
import { vehicleSearvices } from "../Vehicles/vehicles.service";

const postBooking = async (req: Request, res: Response) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } = req.body
    if (rent_end_date <= rent_start_date) {
        console.error("Error: rent_end_date must be greater than rent_start_date.");
        throw new Error("Invalid date range: End date must be after start date.");
    }

    const vehicle = await vehicleSearvices.getSingleVehicles(vehicle_id)
    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    if (end <= start) {
        return res.status(400).json({
            success: false,
            message: "End date must be after start date"
        });
    }
    const duration = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const vehicleData = vehicle.rows[0];
    try {
        const total_price = duration * parseFloat(vehicleData.daily_rent_price);
        const result = await bookingServer.postBooking(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
        res.status(201).json({
            success: true,
            message: "Booking Compleated",
            data: result
        })
        if (result) {
            if (status === 'returned' || status === 'cancelled') {
                const availability_status = "available";
                vehicleSearvices.updateVehiclesByBookint(availability_status, vehicle_id)
            }
            const availability_status = "booked";
            vehicleSearvices.updateVehiclesByBookint(availability_status, vehicle_id)
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const getBooking = async (req: Request, res: Response) => {

    if (req.query.viewAll) {
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
    } else if (req.query.userId) {
        // 
        try {
            const result = await bookingServer.getUserBooking()
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


}
const updateBooking = async (req: Request, res: Response) => {
    const { status } = req.body
    console.log(req.body);
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