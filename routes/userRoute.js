import express from "express";
import { registerUser, loginUser, getUser, userDelete, updateUser } from "../controllers/usercontroller.js";

const router = express.Router();

//register
router.post ('/register', registerUser);

//login
router.post ('/login', loginUser );

// get user
router.get('/:id', getUser );

//deleteuser

router.delete('/:id', userDelete);

//update user

router.patch('/:id', updateUser );



export default router;
