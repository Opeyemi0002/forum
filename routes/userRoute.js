import express from "express";
import { registerUser, loginUser, getUser, profileViewLogic,followCtrl,profilePhotoUpload,userDelete, updateUser } from "../controllers/usercontroller.js";
import isLogin from "../middleware/islogin.js";
import multer from "multer";
import storage from "../config/cloudinary.js";


const router = express.Router();

const upload = multer({storage});

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

//profile photo upload
router.post('/profile-pix',isLogin,upload.single('profile'), profilePhotoUpload );
//profie viewer
router.get('/viewer-profile/:id', isLogin, profileViewLogic);
// follow and followers
router.get('/followers/:id', isLogin, followCtrl);

export default router;
