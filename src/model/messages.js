import mongoose from "mongoose";

const messageSchemas = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    },
})

const Messages = mongoose.model("Messages",messageSchemas)

export default Messages