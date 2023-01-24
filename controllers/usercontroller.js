import User from "../model/users/userModel.js";

export const registerUser =async (req, res) => {
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
    
}

export const loginUser = async (req, res) => {
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
    
}

export const getUser = async (req, res) => {
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
        
        /*const userFind = await User.findOne({_id:id});

        if (firstname) userFind.firstname = firstname;
        if (lastname) userFind.lastname = lastname;
        if (email) userFind.email = email;
        if(password) userFind.password = password; */
        
        await User.findOneAndUpdate({_id:id},{firstname,lastname,email,password}, {useFindAndModify:false});
         
        res.json({message: "the user has been updated successfully"});
       
        }catch(error) {
        console.log (error.message);

    }
    
}