import dotenv from 'dotenv';


dotenv.config();

export default {
    PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET
}