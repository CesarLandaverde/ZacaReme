import DoctorModel from '../models/doctorModel.js';

const doctorController = {};


//Obtiene todos los doctores
doctorController.getDoctors 
= async (req, res) => {

    try {
        const doctors = await DoctorModel.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message:"Error", error: error.message });
    }
};


//Obtiene un doctor por ID

doctorController.getDoctorById
=async(req,res)=>{

    try {
        const doctor = await DoctorModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
        
    }
};

