/*
Campos:
Nombre 
Especialidad
Correo Electrónico
CONTRASEÑA
*/

import {Schema, model} from 'mongoose';

const doctorSchema = new Schema({

     name: {
        type: String,
        required: true,
        match:[
            /^[a-zA-Z\s]+$/,
            'El nombre solo puede contener letras y espacios'
        ],//Esto es para que el Doctor tenga uun nombre real yt no usen otro caracteres,
        minlength: [3,"El nombre debe tener al menos 3 caracteres"],
        trim: true,
     },
        specialty: {
            type: String,
            required: true,
            match:[
                /^[a-zA-Z\s]+$/,
                'La especialidad solo puede contener letras y espacios'
            ],
            minlength: [3,"La especialidad debe tener al menos 3 caracteres"],
            trim: true,
        },

        email:{
          type: String,
            required: true,
            unique: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'El correo electrónico no es válido'
            ],
            trim: true,


        },
    
        password:{
            type: String,
            required: true,
            minlength: [6,"La contraseña debe tener al menos 6 caracteres"],
            trim: true,
        }
        


},{
    timestamps: true,
    strict: false,
}

);


export default model('Doctor', doctorSchema);