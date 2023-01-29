import jwt from "jsonwebtoken";

const verifyToken = (token) => {
    return jwt.verify(token,process.env.Token_Key, (error, decoded) => {
        if(error) {
            return false; 
        }
        else {
            return decoded;
        }
    } );
}

export default verifyToken;