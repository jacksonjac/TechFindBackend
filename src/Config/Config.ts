import dotenv from 'dotenv';
dotenv.config();

export default {
    port :3000,
    mongo:{
        uri:process.env.MONGO_URI_NAME
    }
}