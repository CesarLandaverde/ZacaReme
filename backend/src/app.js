import express from 'express';
import DoctorRoutes from './routes/doctor.js';
import RegisterDoctorRoutes from './routes/registerDoctor.js';
//import RecoveryPasswordRoutes from './routes/recoveryPassword.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/doctors", DoctorRoutes);
app.use("/api/register", RegisterDoctorRoutes);


export default app;