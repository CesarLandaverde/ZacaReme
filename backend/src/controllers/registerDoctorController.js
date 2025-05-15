import DoctorModel from '../models/Doctor.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';
import nodemailer from 'nodemailer';
import cripto from 'crypto';
import { error } from 'console';


const registerDoctorController = {};

//Create:Registra un nuevo doctor y envia codigo de verificación por correo electrónico

registerDoctorController.register = async (req, res) => {
    console.log("Entró al controlador");
    const {name, specialty, email, password} = req.body;
    console.log("Body recibido:", req.body);

    if (!name || !specialty || !email || !password) {
        console.log("Faltan campos");
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingDoctor = await DoctorModel.findOne({ email });
        console.log("existingDoctor:", existingDoctor);
        if (existingDoctor) {
            return res.status(409).json({ message: 'Doctor already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newDoctor = new DoctorModel({
            name,
            specialty,
            email,
            password: passwordHash,
        });

        await newDoctor.save();
        console.log("Doctor guardado");

        const verificationCode = cripto.randomBytes(32).toString('hex');
        const expiresAt = Date.now() + 2 * 60 * 1000;

        const tokenCode = jwt.sign(
            { verificationCode, expiresAt },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        // RESPUESTA AL CLIENTE
        res.status(201).json({
            message: "Doctor registrado correctamente"
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Error registering doctor', error: error.message });
    }
}
    
export default registerDoctorController;
