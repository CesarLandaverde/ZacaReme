
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

    const {name,specialty,email,password} = req.body;

    //Validar los campos

    if (!name || !specialty || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        //Verifican que si el doctor ya existe
        const existingDoctor = await DoctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(409).json({ message: 'Doctor already exists' });
        }

        //Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        //Crear el nuevo doctor
        const newDoctor = new DoctorModel({
            name,
            specialty,
            email,
            password: passwordHash,
        });

        await newDoctor.save();

        constverificationCode = cripto.randomBytes(32).toString('hex');//Codigo Corto
        const expiresAt = Date.now() + 2* 60 * 1000; // 2 minutos

        //Crear un JWT con el codigo y su expiracion

        const tokenCode = jwt.sign(
            {
                verificationCode,
                expiresAt,
            },
            config.jwt.secret,
            {
                expiresIn: '2m',
            }
        );

        //Guardar el token en una cookie 
        res.cookie("verificationCode", tokenCode, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 2 * 60 * 1000, // 2 minutos2
        });

        //Enviar el correo electrónico de verificación(JWT)

   const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.email,//Mi correo electrónico
                pass: config.email.password,//La password()o()
            },
        });

        const mailOptions = {
            from: config.email.email,
            to: email,
            subject: 'Verificación de correo electrónico',
            text: `Para verificar tu cuenta, utiliza el siguiente código de verificación: ${verificationCode}\nEste código expirará en 2 horas.\nSi no solicitaste este registro, por favor ignora este correo.`,
        };
        //Enviar correo
        transporter.sendMail(mailOptions,(error,info)  =>{
      if (error) {
    console.log('Error al enviar el correo electrónico:', error);
    return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
}

    console.log("El correo electronico" + info.response);

        });

    //Enviar una respuesta con el codigo de verificación
    res.status(201).json({
        message: "Doctor registered successfully,Please check your email to verify your account",
        token: tokenCode, //Devuelve el token para la verificacion 


    });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al registrar el doctor' , error: error.message });
    }
};

//Verificacion del correo electronico el recibir el token 

registerDoctorController.verifyCodeEmail = async (req,res)=>{
 const {verificationCode} = req.body;
 const token = req.cookies.verificationToken;

 if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
    
 }
 try {
    //Verifica y decodifica elJWT 
    const decoded = jwt.verify(token, config.jwt.secret);
    const {email,verificationCode:storedCode}= decoded;

    //Compara el codigo recibido con el almacenado
    if (verificationCode !== storedCode) {
        return res.status(401).json({ message: 'Invalid verification code' });
        
    }
    //Marcar al doctor como verificado
    const doctor = await DoctorModel.findOne({ email });
    if(!doctor){
return res.status(404).json({ message: 'Doctor not found' });

   }
   //Actualiza el campo
   doctor.isVerified = true;
    await doctor.save();

    //Limpias la cookie
    res.clearCookie('verificationToken');

    res.status(200).json({ message: 'Email verified successfully' });


 } catch (error) {
    res
   .status(500)
   .json({ message: 'Error verifying email', error: error.message });
    
 }


};

export default registerDoctorController;
