import { pool } from "../../../../config/db"

const postBooking = async (
    customer_id: number,
    vehicle_id: number,
    rent_start_date: Date,
    rent_end_date: Date,
    total_price: number,
    status: string
) => {

    const finalStatus = status || 'active';

    try {
        const result = await pool.query(
            `INSERT INTO bookings(customer_id , vehicle_id, rent_start_date, rent_end_date, total_price, status) 
             VALUES($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, finalStatus]
        );
        return result;

    } catch (error : any) {
        if (error.code === '23503') {
            if (error.constraint === 'bookings_customer_id_fkey') {
                throw new Error("Customer ID not found in the users table.");
            }
            if (error.constraint === 'bookings_vehicle_id_fkey') {
                throw new Error("Vehicle ID not found in the vehicles table.");
            }
        } else if (error.code === '23502') {
            throw new Error("Missing required data (NULL value).");
        } else if (error.code === '23514') {
            throw new Error("Booking data violates database constraints (e.g., total price must be positive, status is invalid).");
        }
        console.error("Database Error during postBooking:", error.message);
        throw new Error("Failed to create booking due to a database error.");
    }
}
const getBooking = async () => {
    const result = await pool.query(`SELECT * FROM bookings `)
    return result
}
const updateBooking = async (status: string, id: string) => {
    const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, id])
    return result
}

export const bookingServer = {
    postBooking,
    getBooking,
    updateBooking
}