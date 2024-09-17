import express from "express";
import errorMessage from "../itills/errorMessage.js";
import User from "../model/user.js";

class dataChequer{
static async inputempty(req,res,next){
    const{userName,email,password}=req.body

    if(userName ==""){
        return errorMessage(res,201,`provide your firstName correctly`)
    }else if(email==""){
        return errorMessage(res,200,`provide your email correctly`)

}
else if(password==""){
    return errorMessage(res,200,`provide your password correctly`)
}
else{
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