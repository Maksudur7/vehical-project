import { Pool } from "pg";
import config from ".";

const { connection_str } = config
export const pool = new Pool({
    connectionString: `${connection_str}`
})

const initDB = async () => {

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password VARCHAR(150) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            role VARCHAR(20) DEFAULT 'customer',
            CHECK (CHAR_LENGTH(password) >= 6),
            CHECK (role IN('admin', 'customer'))
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles (
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(150) NOT NULL,
            type VARCHAR(10) NOT NULL,
            registration_number VARCHAR(15) NOT NULL,
            daily_rent_price DECIMAL(10,2) NOT NULL,
            availability_status VARCHAR(50) NOT NULL DEFAULT 'available',
            CHECK (type IN('car', 'bike', 'van', 'SUV')),
            CHECK (daily_rent_price > 0),
            CHECK(availability_status IN('available', 'booked'))
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL,
            total_price DECIMAL(10,2) NOT NULL,
            status VARCHAR(100) NOT NULL DEFAULT 'active',
            CHECK (rent_end_date > rent_start_date),
            CHECK (total_price > 0),
            CHECK(status IN('active', 'cancelled', 'returned'))
        );
    `);

    console.log("Database initialized successfully!");
};


export default initDB
