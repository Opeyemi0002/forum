import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign ({id},process.env.Token_Key, {expiresIn: process.env.Token_Expiry});
}

export default generateToken;