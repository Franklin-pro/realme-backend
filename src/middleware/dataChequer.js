import express from "express";
import errorMessage from "../itills/errorMessage";
import User from "../model/user.js";

class dataChequer{
static async inputempty(req,res,next){
    const{firstName,lastName,email,password,confirmPassword}=req.body

    if(firstName ==""){
        return errorMessage(res,201,`provide your firstName correctly`)
    }else if(lastName==""){
        return errorMessage(res,200,`provide your lastName correctly`)
    }else if(email==""){
        return errorMessage(res,200,`provide your email correctly`)

}
else if(password==""){
    return errorMessage(res,200,`provide your password correctly`)

}

else if(confirmPassword==""){
    return errorMessage(res,200,`provide your lastName correctly`)
}else{
    return next()
}
}
static async emailExist(req,res,next){
    const email = req.body.email
    const user = await User.findOne({email})
    if(user){
        return errorMessage(res,200,`email exist`)
    }else{
        return next()
    }
}
}
export default dataChequer