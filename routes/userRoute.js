import express from "express";
import { registerUser, loginUser, getUser, userDelete, updateUser } from "../controllers/usercontroller.js";
import isLogin from "../middleware/islogin.js";
const router = express.Router();

//register
router.post ('/register', registerUser);

//login
router.post ('/login', loginUser );

// get user
router.get('/profile', isLogin, getUser );

//deleteuser

router.delete('/:id', userDelete);

//update user

router.patch('/:id', updateUser );



export default router;
