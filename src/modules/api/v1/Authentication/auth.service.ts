import { pool } from "../../../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../../../config";

// create a user 
const regster = async (name: string, email: any, password: string, phone: string) => {

    //adding password hasing and created user 
    const hashPassword = bcrypt.hashSync(password, 10)
    const result = await pool.query(`INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4) RETURNING *`, [name, email, hashPassword, phone])
    return result
}

// find a user
const login = async (email: any, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return false;
    }
    const token = jwt.sign({ email: email, password: password, role: user.role }, config.secret_key as string, { expiresIn: "7d" })
    return { token, user };
}

export const authService = {
    regster,
    login
}