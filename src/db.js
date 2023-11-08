import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'dSsdMo84ra#th7778DA@',
    port: 4000,
    database: 'bushopDB'
})