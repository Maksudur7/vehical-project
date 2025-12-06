
import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db";
import { bookingServer } from "../modules/api/v1/Bookings/booking.service";


const bookingAccess = async (req: Request, res: Response, next: NextFunction) => {
    const loggedInUser = req.user;
    const bookingId = req.params.bookingId;
    const currentDate = new Date();
    const status = req.body.status;

    if (!loggedInUser) {
        return res.status(401).json({ success: false, message: "Unauthorized: Please log in." });
    }
    const result = await pool.query(`SELECT customer_id, rent_start_date, status FROM bookings WHERE id=$1`, [bookingId]);
    if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Booking not found." });
    }
    const booking = result.rows[0];
    const rentStartDate = new Date(booking.rent_start_date);
    const rentEndDate = new Date(booking.rent_end_date);
    if (loggedInUser.id === booking.customer_id && status === 'cancelled' && rentStartDate >= currentDate) {
        return next();
    }

    if (loggedInUser.role === 'admin') {
        return next();
    }
    if (currentDate >= rentEndDate) {
        const systemStatus = "returned"
        const result = await bookingServer.updateBooking(systemStatus, bookingId!)
        return next()
    }

    return res.status(403).json({
        success: false,
        message: "Something is wrong"
    })
};

export default bookingAccess;