import express from "express";
import User from "../model/users/userModel.js";

const router = express.Router();

//register
router.post ('/register', async (req, res) => {
    const {firstname,lastname, email, password} = req.body;
    try{
        const userFound = await User.findOne({email});
        if (userFound) {
            res.json({message:"user is registered already"});
        }
        const user = await User.create({
          firstname,
          lastname,
          email,
          password  
        });
        res.json({
            status: "success",
            data: user
            
        })
    }catch(error) {
        console.log (error.message);
        process.exit(1);
    }
    
});

//login
router.post ('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        
        const userFound = await User.findOne({email});
        if (userFound?.password === password) {
            
            return res.json({
                status: "success",
                data: userFound
            });
        }
    
        return res.json({message: "your email or password is not correct"});
            
        
    }catch(error) {
        console.log (error.message);
        process.exit(1);
    }
    
});

// get user
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const userDetails = await User.findById(id);
        if (userDetails) {
            res.json({
                status: "success",
                data: userDetails
            });
        }
        res.json({message:"you don't have an account with us"});      
        
    }catch(error) {
        console.log (error.message);

    }
    
});

//deleteuser

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await User.findOneAndDelete({_id:id});
        res.json({
                message:"the user has been deleted succesfully"
            });        
        
    }catch(error) {
        console.log (error.message);

    }
    
});

//update user

router.patch('/:id', async (req, res) => {
    
   
    try{
        const {id} = req.params;
        const{firstname, lastname, email, password} = req.body;
        const userFind = await User.findById(id);
        
        if(firstname) userFind.firstname = firstname;
        if(lastname) userFind.lastname = lastname;
        if(email) userFind.email = email;
        if(password) userFind.password = password;
         
        res.json({message: "the user update has been updated successfully"});
        //res.send (req.body);
        }catch(error) {
        console.log (error.message);

    }
    
});



export default router;
