import dotenv from "dotenv";
dotenv.config();

console.log("DB_URI desde config.js:", process.env.DB_URI);

export const config = {
    server: {
        port: process.env.PORT || 5000
    },
    db: {
        URI: process.env.DB_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES, // <-- Esto está bien
    },
    email: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASS,
    },
};