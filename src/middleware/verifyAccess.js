import jwt  from "jsonwebtoken";
import errorMessage from "../itills/errorMessage";

const verifyAccess = (passrole)=>{
    return (req,res,next)=>{
        const token = req.headers['auth-token']

        if(!token){
            return errorMessage(res,401,`no token provided`)
        }
        else{
            try {
                const verifyToken = jwt.verify(token,process.env.SECRETE_KEY,{expiresIn:'1d'})
                const user = verifyToken.user

                if(user !==passrole){
                    return errorMessage(res,401,`you don't have access`)
                }

                return next()
            } catch (error) {
                if(error.name = "JsonWebTokenError"){
                    return errorMessage(res,401,`invalid token`)
                }else if(error.message == "jwt expired"){

                    return errorMessage(res,401,`token expired`)
                }
                else{
                    return errorMessage(res,401,error)
                }
                
            }
        }
    }
}

export default verifyAccess