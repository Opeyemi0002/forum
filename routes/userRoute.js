import express from "express";
import { registerUser, loginUser, getUser,blockUser,unBlockUser,unFollowCtrl,profileViewLogic,followCtrl,profilePhotoUpload,userDelete, updateUser } from "../controllers/usercontroller.js";
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
// following
router.get('/follower/:id', isLogin, followCtrl);
// unfollowing
router.get('/unfollower/:id', isLogin, unFollowCtrl);
//blocked user
router.get('/blocked/:id', isLogin, blockUser);
//unblocked user
router.get('/unblocked/:id', isLogin, unBlockUser);

export default router;
