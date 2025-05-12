import dotenv from "dotenv";

dotenv.config();

export const config = {

    db: {
        URI: process.env.DB_URI
    },
    port:{
        port: process.env.PORT
    },
    jwt:{
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    email:
       {
        email: process.env.EMAIL,
        password: process.env.EMAIL_PASSWORD,
       },
};