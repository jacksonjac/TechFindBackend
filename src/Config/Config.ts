import dotenv from 'dotenv';
dotenv.config();
console.log('mongoosuri',process.env.MONGO_URI_NAME)

export default {
    port :3000,
    mongo:{
        uri:process.env.MONGO_URI_NAME
    }
}