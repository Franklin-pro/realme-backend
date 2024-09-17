import express from 'express'
import mongoose from 'mongoose'
import User from '../model/user.js'
import errorMessage from '../itills/errorMessage.js'
import successMessage from '../itills/successMessage.js'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'

class userCotroller{
static async createUser(req,res){
try {
    const{userName,email,password,confirmPassword,role}=req.body
    if(!password){
        return errorMessage(res,401,`password is required`)
    }
    if(req.body.password !== req.body.confirmPassword){
        return errorMessage(res,401,`password and confirmpassword must be matched`)
    }
    else{
        const hashPassword = bcrypt.hashSync(req.body.password,10)

        const user = await User.create({userName,email,role,password:hashPassword,confirmPassword})
       return successMessage(res,201,`user created successfully`,user)
    }
} catch (error) {
    return errorMessage(res,500,error)
}

}
static async getAllUser(req,res){
    const user = await User.find()

    if(!user || user==0){
        return errorMessage(res,401,`no user found`)
    }else{
        return successMessage(res,200,`all users found ${user.length}`,user)
    }
}
static async deleteAllUser(req,res){
    const users = await User.deleteMany();

    if(!users){
        return errorMessage(res,401,`no users deleted`)
    }else{
        return errorMessage(res,200,`all users deleted`)
    }
}
static async getOneUser(req,res){
    const id = req.params.id
    const user = await User.findById(id)
    if(!user){
        return errorMessage(res,401,`no user found ${id}`)
    }else{
        return successMessage(res,200,`user found`,user)
    }
}
static async deleteOneUser(req,res){
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if(!user){
        return errorMessage(res,401,`no user delete by ${id}`)
    }else{
        return errorMessage(res,200,`user delete`)
    }
}
static async updateUser(req,res){
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id,req.body,{new:true})
    if(!user){
        return errorMessage(res,401,`no user updated by ${id}`)
    }else{
        return successMessage(res,200,`user updated`,user)
    }
}
static async login(req,res){
    const{email,password}=req.body

    const user = await User.findOne({email})
    if(!user){
        return errorMessage(res,401,`invalid email or password`)
    }else{
        const comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return errorMessage(res,201,`invalid email or password`)
        }else{
         const token = jwt.sign({user:user},process.env.SECRET_KEY,{expiresIn:"1d"})
         return res.status(200).json({
            token:token,
            data:{
                user:user
            }
        })
        }
    }

}
}
export default userCotroller