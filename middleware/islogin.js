import obtainToken from "../utility/obtaintokenfromheader.js";
import verifyToken from "../utility/verifytoken.js";

const isLogin = (req,res,next) => {
    const token = obtainToken(req);
    const userDecoded = verifyToken(token);

    req.userAuth = userDecoded.id;

    if(!userDecoded)  {
        return res.json({
            status:"error",
            message:"kindly login because the token is either expired or invalid"
        });
    }else{
        next();
    }
}

export default isLogin;