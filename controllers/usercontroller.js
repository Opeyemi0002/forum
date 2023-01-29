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