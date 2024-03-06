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
            check("firstName","write your firstName correctly").trim().isAlpha(),
            check("lastName","write your lastName correctly").trim().isAlpha(),
            check("email","write your email correctly @gmail.com").trim().isEmail(),
            check("password","make strong password start with capital letter mix number,letter and symbols").trim().isStrongPassword(),
            
        ]
    }
}
export default Validator