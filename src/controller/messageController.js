import express from 'express';
import Messages from '../model/messages';
import errorMessage from '../itills/errorMessage';
import successMessage from '../itills/successMessage';

class messageController{
    static async createMessage(req,res){
        const{fullName,email,message}=req.body

        const messages = await Messages.create({fullName,email,message})

        if(!messages){
            return errorMessage(res,201,`no message created`)
        }else{
            return successMessage(res,200,`message created succefully`,messages)
        }
    }
    static async getAllMessage(req,res){
        const messages = await Messages.find();
        if(!messages || messages.length==0){
            return errorMessage(res,201,`no messages found`)
        }else{
            return successMessage(res,200,`messages ${messages.length} retrives `,messages)
        }
    }
    static async getOneMessage(req,res){
        const id = req.params.id
        const messages = await Messages.findById(id)

        if(!messages){
            return errorMessage(res,201,`no message retrived with ${id}`)
        }else{
            return successMessage(res,200,`message retrived ${messages.length}`,messages)
        }
    }
    static async deleteAllMessage(req,res){
        const messages = await Messages.deleteMany();
        if(!messages){
            return errorMessage(res,201,`no message deleted`)
        }else{
            return successMessage(res,200,`all message deleted`)
        }
    }
    static async deleteOneMessage(req,res){
        const id = req.params.id
        const messages = await Messages.findByIdAndDelete(id)

        if(!messages){
            return errorMessage(res,201,`no message deleted with ${id}`)
        }else{
            return successMessage(res,200,`message deleted`)
        }
    }
}
export default messageController