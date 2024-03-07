import mongoose from "mongoose";

const blogsSchemas = new mongoose.Schema({
    blogTitle:{
        type:String,
        required:true
    },
    blogImage:{
        type:String,
        required:true,
    },
    blogDescription:{
        type:String,
        required:true
    },
    postedAt:{
        type:Date,
        default:Date.now()
    }
})

const Blogs = mongoose.model("blogs",blogsSchemas)

export default Blogs