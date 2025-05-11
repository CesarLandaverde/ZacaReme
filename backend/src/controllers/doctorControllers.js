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

doctorController.uodateDoctor
=async(req,res)=>{

try {
  const {name,specialty,email,password} = req.body;

const updatedDoctor = await DoctorModel.findByIdAndUpdate(
    req.params.id,
    {name,specialty,email,password},
    {new:true}
);

if (!updatedDoctor) {
    return res.status(404).json({ message: 'Doctor not found' });
    
}

res.json({message: 'Doctor updated successfully'});

}
catch (error) {
    res.status(500).json({ message: 'Error not found the Doctor ', error: error.message });
}
};

//Elimina un doctor por ID

doctorController.deleteDoctor
=async (req,res)=>{
   const deleteDoctor = await DoctorModel.findbyIdAndDelete(req.params.id);

   if (!deleteDoctor) {
       return res.status(404).json({ message: 'Doctor not found' });
    
   }

    res.json({message: 'Doctor deleted successfully'});

    catch (error){
        res.status(500).json({ message: 'Error not found the Doctor ', error: error.message });
    }




};

export default doctorController;

