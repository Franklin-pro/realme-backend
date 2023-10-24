import { check,validationResult } from "express-validator";
import errorMessage from "../itills/errorMessage";

 class Validator{
    static inputValidator(req,res,next){
        const error = validationResult(req)
        if(!error == error.isEmpty()){
        error.errors.map((error)=>{
            return errorMessage(res,201,error.msg)
        })
        }else{
             return next()
        }
    }
    static userAccount(){
        return [
            check("firstName","plz put your firstName").trim().isAlpha(),
            check("lastName","plz put your lastName").trim().isAlpha(),
            check("email","plz put your email").trim().isEmail(),
            check("password","plz put your password").trim().isStrongPassword(),
            
        ]
    }
}
export default Validator