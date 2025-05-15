import express from 'express';
const router = express.Router();

import doctorController from '../controllers/doctorControllers.js';
 router.route("/")
 .get(doctorController.getDoctors)

 router.route("/:id")
 .get(doctorController.getDoctorById)
 .put(doctorController.updateDoctor)
 .delete(doctorController.deleteDoctor)

 export default router;
