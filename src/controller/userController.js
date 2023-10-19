import express from 'express'
import mongoose from 'mongoose'
import User from '../model/user'
import errorMessage from '../itills/errorMessage'
import successMessage from '../itills/successMessage'
import bcrypt from 'bcrypt'

class userCotroller{
static async createUser(req,res){
    const{firstName,lastName,email,password,confirmPassword,role}=req.body
const hashPassword = bcrypt.hashSync(req.body.password,10)

    const users = await User.create({firstName,lastName,email,password:hashPassword,role})

    if(req.body.password!==req.body.confirmPassword){
        return errorMessage(res,201,`password and confirmPassword not match`)
    }

    if(!users){
        return errorMessage(res,201,`no user created`)
    }else{
        return successMessage(res,200,`user created`,users)
    }
}
static async getAllUser(req,res){
    const user = await User.find()

    if(!user || user==0){
        return errorMessage(res,201,`no user found`)
    }else{
        return successMessage(res,200,`all users found ${user.length}`,user)
    }
}
static async deleteAllUser(req,res){
    const users = await User.deleteMany();

    if(!users){
        return errorMessage(res,201,`no users deleted`)
    }else{
        return errorMessage(res,201,`all users deleted`)
    }
}
static async getOneUser(req,res){
    const id = req.params.id
    const user = await User.findById(id)
    if(!user){
        return errorMessage(res,201,`no user found ${id}`)
    }else{
        return successMessage(res,200,`user found`,user)
    }
}
static async deleteOneUser(req,res){
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if(!user){
        return errorMessage(res,201,`no user delete by ${id}`)
    }else{
        return errorMessage(res,201,`user delete`)
    }
}
static async updateUser(req,res){
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id,req.body,{new:true})
    if(!user){
        return errorMessage(res,201,`no user updated by ${id}`)
    }else{
        return successMessage(res,200,`user updated`,user)
    }
}
}
export default userCotroller