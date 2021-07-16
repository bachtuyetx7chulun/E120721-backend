import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.HOST_PORT || 4000;
export const HOST_NAME =
    process.env.HOST_NAME || 'https://e120721.herokuapp.com/';
