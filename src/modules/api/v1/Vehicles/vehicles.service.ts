import { pool } from "../../../../config/db"

const postVehicles = async (vehicle_name: string, type: string, registration_number: string, daily_rent_price: number,
    availability_status: string) => {
    const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price,
        availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *` , [vehicle_name, type, registration_number, daily_rent_price,
        availability_status]);
    return result

}

const getVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`)
    return result
}

const getSingleVehicles = async (id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
    return result
}
const updatevehicles = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price,
        availability_status, id } = payload
    const result = await pool.query(`UPDATE vehicles SET vehicle_name =$1, type =$2, registration_number =$3, daily_rent_price =$4,
            availability_status =$5, id =$6`, [vehicle_name, type, registration_number, daily_rent_price,
        availability_status, id]);
    return result
}

const deletVehicles = async (id: string)=>{
    const result = await pool.query(`DELETE FROM users WHERE id =$1`, [id])
    return result
}

export const vehicleSearvices = {
    postVehicles,
    getVehicles,
    getSingleVehicles,
    updatevehicles,
    deletVehicles
}