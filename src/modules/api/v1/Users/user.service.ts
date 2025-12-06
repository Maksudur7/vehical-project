import { pool } from "../../../../config/db"

const getUser = async () => {
    const result = pool.query(`SELECT * FROM users`)
    return result
}

const updateUser = async (payload: Record<string, unknown>, id : string) => {
    const { name, email, phone, role} = payload;
    const result = pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING * `, [name, email, phone, role, id])
    return result
}
const deletUser = async (id: string) => {
    const result = pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [id])
    return result
}

export const userService = {
    getUser,
    updateUser,
    deletUser
}