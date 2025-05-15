import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import Doctor from '../models/Doctor.js';
import {SendEmail} from '../utils/sendEmail.js';
import bcrypyt from 'bcrypt';


const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: 'El correo es obligatorio' });
        }

        let user;
        let userType = null;

        // Se busca en la coleccion de doctores
        user = await Doctor.findOne({ email });
        if (user) {
            userType = 'doctor';
        }
        if (!user) return res.status(400).json({ message: 'User no existe' });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Guardar token JWT con el correo, el codigo y el user type
        const token = jwt.sign({ email, code, userType }, config.JWT_SECRET, { expiresIn: '10m' });

        // Guardar el token en una cookie
        res.cookie("tokenRecoveryCode", token, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000 
        });

        // Enviar el correo al usuario con codigo
        await SendEmail({
            email,
            subject: "Password Recovery Code",
            text: `Your verification code is: ${code}`,
            html: HTMLRecoveryEmail(code)
        });

        return res.status(200).json({ message: 'Código enviado' });

    } catch (error) {
        return res
        .status(500)
        .json({ message: 'Error al enviar el correo' ,
            error: error.message ,
        });
        
    }
};

//Verificar el codigo

recoveryPasswordController.verifyCode = async (req, res) => {
    const { code } = req.body;
    try {
        if (!code) {
            return res.status(400).json({ message: 'El codigo es obligatorio' });
        }

        // Verificar el token
        const token = req.cookies.tokenRecoveryCode;
        if (!token) {
            return res.status(401).json({ message: 'Token no existe' });
        }

        // Verificar el token JWT
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Verificar si el codigo es correcto
        if (decoded.code !== code) {
            return res.status(403).json({ message: 'Codigo incorrecto' });
        }

        // Marcar el token como verificado
        const newToken = jwt.sign(
            { email: decoded.email, userType: decoded.userType, verified: true },
            config.JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Reemplazar el token en la cookie con el nuevo token 
        res.cookie("tokenRecoveryCode", newToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000 
        });

        return res.status(200).json({ message: 'Código verificado' });

    } catch (error) {
        return res.status(500).json({
            message: 'Error en el servidor',
            error: error.message,
        });
    }
};
