import { pool } from "../../../../config/db"

const postBooking = async(customer_id : number, vehicle_id : number, rent_start_date : Date, rent_end_date : Date, total_price : number, status : string)=>{
    const result = pool.query( `INSERT INTO bookings(customer_id , vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [customer_id , vehicle_id, rent_start_date, rent_end_date, total_price, status])
    return result
}
const getBooking = async ()=>{
    const result = pool.query(`SELECT * FROM bookings`)
    return result
}
const updateBooking = async (status: string, id: string)=>{
    const result = pool.query(`UPDATE bookings SET status=$1, WHERE id=$2 RETURNING *`, [status, id])
    return result
}

export const bookingServer = {
    postBooking,
    getBooking,
    updateBooking
}