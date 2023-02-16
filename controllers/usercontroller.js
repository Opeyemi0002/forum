import User from "../model/users/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utility/generatetoken.js";
//import obtainToken from "../utility/obtaintokenfromheader.js";
//import isLogin from "../middleware/islogin.js";
//registration

export const registerUser =async (req, res) => {
    const {firstname,lastname, email, password} = req.body;
    try{
        const userFound = await User.findOne({email});
        if (userFound) {
            res.json({message:"user is registered already"});
        }else{
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.create({
          firstname,
          lastname,
          email,
          password: passwordHash  
        });
        res.json({
            status: "success",
            data: user
            
        })}
    }catch(error) {
        console.log (error.message);
        process.exit(1);
    }
    
}

//login
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const userName = await User.findOne({email});
    //console.log(obtainToken(req));
    try{ 
        if(!userName) {
        return res.json({message: "the user or password is not correct"});
        }

        const userPassword = await bcrypt.compare(password, userName.password);

        if(!userPassword) {
            return res.json({message: "the user or password is not correct"});
        }else{
            res.json({
                status:"success",
                data: {
                    firstname: userName.firstname,
                    lastname: userName.lastname,
                    email: userName.email,
                    token: generateToken(userName._id)
                }
        })
        }

    }catch(error) {
        console.log(error.message);
    }
    
}

export const getUser = async (req, res) => {
    //const {id} = req.params;
    try{

        const userDetails = await User.findById(req.userAuth);
        if (userDetails) {
            return res.json({
                status: "success",
                data: userDetails
            });
        }
        else res.json({message:"you don't have an account with us"});      
        
    }catch(error) {
        console.log (error.message);

    }
    
}

export const userDelete = async (req, res) => {
    const {id} = req.params;
    try{
        await User.findOneAndDelete({_id:id});
        res.json({
                message:"the user has been deleted succesfully"
            });        
        
    }catch(error) {
        console.log (error.message);

    }
    
}

export const updateUser =async (req, res) => {
    
   
    try{
        const {id} = req.params;
        const{firstname, lastname, email, password} = req.body;
        
        await User.findOneAndUpdate({_id:id},{firstname,lastname,email,password}, {useFindAndModify:false});
         
        res.json({message: "the user has been updated successfully"});
       
        }catch(error) {
        console.log (error.message);

    }
    
}
export const profilePhotoUpload = async (req,res) => {
    //console.log(req.file); 
    try{
        
        const userDetails = await User.findById(req.userAuth);
        
        if (!userDetails) {
            res.json({status:"error", message:"user not found"})
        }

        if(req.file) {
        await User.findByIdAndUpdate(req.userAuth,{
            $set:{
                profilephoto:req.file.path
            }
        }, {new:true});
        res.json({
            success: "success",
            message: "image uploaded successfully"
        });

        }
        
        
    }catch(error){
        console.log(error.message);
    }
}
export const profileViewLogic = async (req,res) => {
    try{
        const profileOwner = await User.findById(req.params.id);
        const profileViewer = await User.findById(req.userAuth);

        if(profileOwner && profileViewer) {
            const profileThatWasViewed = profileOwner.views.find(view=> view.toString()===profileViewer._id.toString());
            if(profileThatWasViewed) {
                res.json({
                    status:"error",
                    message: "you have viewed this profile"
                });
            }else {
                profileOwner.views.push(profileViewer._id);
                await profileOwner.save();
                
                res.json({
                    status:"success",
                    data: {
                        firstname:profileOwner.firstname,
                        lastname:profileOwner.lastname,
                        id:profileOwner._id

                    }
                });
            }
        }
        
    }catch(error) {
        console.log(error.message);
    }
}
export const followCtrl = async (req,res) => {
    try{
        const profileBeingFollowed = await User.findById(req.params.id);
        const profileFollowing = await User.findById(req.userAuth);

        if(profileBeingFollowed && profileFollowing) {
            const profileThatWasFollowed = profileBeingFollowed.followers.find(view=> view.toString()===profileFollowing._id.toString());
            if(profileThatWasFollowed) {
                res.json({
                    status:"error",
                    message: "you have followed this profile"
                });
            }else {
                profileBeingFollowed.followers.push(profileFollowing._id);
                await profileBeingFollowed.save();

                profileFollowing.following.push(profileBeingFollowed._id);
                await profileFollowing.save();

                res.json({
                    message: `you have just followed ${profileBeingFollowed.firstname}`
                });
            }
        }

    }catch(error){
        res.json({message:error.message});
    }
}
export const unFollowCtrl = async (req,res) => {
    try{
       const userToUnfollow = await User.findById(req.params.id);
       const userUnfollowing = await User.findById(req.userAuth); 

       if (userToUnfollow && userUnfollowing) {
        const checkFollowingStatus = userUnfollowing.following.find(following=>following.toString()===userToUnfollow._id.toString());

        if(checkFollowingStatus) {
            userToUnfollow.followers = userToUnfollow.followers.filter(follower=>follower.toString() !== userUnfollowing._id.toString());
            await userToUnfollow.save();

            userUnfollowing.following = userUnfollowing.following.filter(following=>following.toString() !== userToUnfollow._id.toString());
            await userUnfollowing.save();

            return res.json({message:`you have unfollow ${userToUnfollow.lastname}`});
        }else{
            return res.json({message: "you are not following this profile"});
        }
       }
    }catch(error) {
        res.json({message: error.message});
    }
}

export const blockUser = async (req,res) => {
    try{
        const userToBlock = await User.findById(req.params.id);
        const userBlocking = await User.findById(req.userAuth);

        if(userToBlock && userBlocking) {
          const isUserBlock =  userBlocking.Blocked.find(block=> block.toString()===userToBlock._id.toString()); 

          if(isUserBlock) {
            return res.json({message:`you have block ${userToBlock.firstname} already`});
          }else{
            userBlocking.Blocked.push(userToBlock._id);
            await userBlocking.save();
            return res.json({message:`you have just block ${userToBlock.firstname}`})
          }
        }
    }catch(error) {
        res.json({message:error.message});
    }
}
export const unBlockUser = async (req,res) => {
    try{
        const userToUnblock = await User.findById(req.params.id);
        const userUnblocking = await User.findById(req.userAuth);
        if(userToUnblock && userUnblocking ) {
            const isUserUnblock = userUnblocking.Blocked.find(unblocked=> unblocked.toString()===userToUnblock._id.toString());

            if (!isUserUnblock) {
                return res.json({message: `you did not block ${userToUnblock.firstname}`});
            }else{
                userUnblocking.Blocked = userUnblocking.Blocked.filter(user=>user.toString()!==userToUnblock._id.toString());
                await userUnblocking.save();

                res.json({message:`you have unblock ${userToUnblock.firstname} successfully`})
            }
        }
    }catch(error){
        res.json({message:error.message});
    }
}