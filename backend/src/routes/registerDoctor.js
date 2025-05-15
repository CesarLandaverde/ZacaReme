import express from 'express';
const router = express.Router();
import registerDoctorController from '../controllers/registerDoctorController.js';


router.route('/')
.post(registerDoctorController.register);

export default router;