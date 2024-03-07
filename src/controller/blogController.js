import express from 'express';
import Blogs from '../model/blogs.js';
import errorMessage from '../itills/errorMessage.js';
import successMessage from '../itills/successMessage.js';

class BlogController{
    static async createBlogs(req,res){
        const{blogTitle,blogImage,blogDescription}=req.body

        const blogs = await Blogs.create({blogTitle,blogImage,blogDescription})

        if(!blogs){
            return errorMessage(res,401,`no blogs created`)
        }else{
            return successMessage(res,200,`blogs created succefully`,blogs)
        }
    }
    static async getAllBlogs(req,res){
        const blogs = await Blogs.find();
        if(!blogs || blogs.length==0){
            return errorMessage(res,401,`no messages found`)
        }else{
            return successMessage(res,200,`blogs ${blogs.length} retrives `,blogs)
        }
    }
    static async getOneBlogs(req,res){
        const id = req.params.id
        const blogs = await Blogs.findById(id)

        if(!blogs){
            return errorMessage(res,401,`no blogs retrived with ${id}`)
        }else{
            return successMessage(res,200,`blogs retrived ${blogs.length}`,blogs)
        }
    }
    static async deleteAllBlogs(req,res){
        const blogs = await Blogs.deleteMany();
        if(!blogs){
            return errorMessage(res,201,`no blogs deleted`)
        }else{
            return successMessage(res,200,`all blogs deleted`)
        }
    }
    static async deleteOneBlogs(req,res){
        const id = req.params.id
        const blogs = await Blogs.findByIdAndDelete(id)

        if(!blogs){
            return errorMessage(res,201,`no blogs deleted with ${id}`)
        }else{
            return successMessage(res,200,`blogs deleted`)
        }
    }
}
export default BlogController