import nodemailer from 'nodemailer';
import { config } from '../config.js';

const SendEmail = async ({ email, subject, text, html }) => {
    // Configura el transporter con los datos de tu .env
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.email,
            pass: config.email.password,
        },
    });

    // Opciones del correo
    const mailOptions = {
        from: config.email.email,
        to: email,
        subject,
        text,
        html,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
};

export default SendEmail;