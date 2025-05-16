import express from 'express';
import DoctorRoutes from './routes/doctor.js';
import RegisterDoctorRoutes from './routes/registerDoctor.js';
import PasswordRoutes from './routes/passwordRecovery.js';
//import RecoveryPasswordRoutes from './routes/recoveryPassword.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/doctors", DoctorRoutes);
app.use("/api/register", RegisterDoctorRoutes);
app.use("/api/password", PasswordRoutes);



export default app;