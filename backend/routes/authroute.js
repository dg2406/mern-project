import express from 'express';
import {registerController, testController} from '../controller/auth.js';
import { loginController } from '../controller/auth.js';
import { requireSignIn ,isAdmin} from '../middlewares/authMidddleware.js';
import { forgotPasswordController } from '../controller/auth.js';
const router=express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.get('/test',requireSignIn,isAdmin,testController);
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
router.post('/forgot-password',forgotPasswordController);

export default router;