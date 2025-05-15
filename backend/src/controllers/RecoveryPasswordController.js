import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import Doctor from '../models/Doctor.js';
import {SendEmail} from '../utils/sendEmail.js';
import bcrypyt from 'bcrypt';


const recoveryPasswordController = {};

 