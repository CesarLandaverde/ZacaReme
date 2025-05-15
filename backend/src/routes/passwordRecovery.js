import express from 'express';
import PasswordRecoveryController from '../controllers/RecoveryPasswordController.js';

const router = express.Router();
router.post('/request-code', PasswordRecoveryController.requestCode);
router.post('/verify-code', PasswordRecoveryController.verifyCode);
router.post('/reset-password', PasswordRecoveryController.resetPassword);

export default router;