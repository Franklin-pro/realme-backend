import bcrypt from 'bcrypt'
import errormessage from '../itills/errorMessage.js'
import successmessage from '../itills/successMessage.js'
import cloudinary from '../itills/cloud.js'
import Blogs from '../model/blogs.js'
import jwt from 'jsonwebtoken'

class BlogsController {
    static async createBlogs(req,res){
        try {
            const { blogName, blogStatus, blogDescription} = req.body;
    
            if (!req.file) {
                return errormessage(res, 400, 'Please upload an image');
            }
    
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'blogs'
            });
    
            const blogs = await Blogs.create({
                blogImage: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
                blogName,
                blogStatus,
                blogDescription,
            });
    
            if (!blogs) {
                return errormessage(res, 401, 'Failed to create blogs');
            }
    
            return successmessage(res, 201, 'Blogs created successfully', blogs);
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }
    static async viewBlogs(req,res){
        const blogs = await Blogs.find()
        if(blogs){
            return successmessage(res,200,`blogs retrived successfully`,blogs)
        }else{
            return errormessage(res,400,`blogs not found`)
        }
    }
    static async viewBlog(req,res){
        const blogID = req.params.id
        const blogs = await Blogs.findById(blogID)
        if(blogs){
            return successmessage(res,200,`retrived blog successfully`,blogs)
        }else{
            return errormessage(res,401,`no blogs found`)
        }
    }
    static async deleteBlog(req,res){
        const blogID = req.params.id
        const blogs = await Blogs.findByIdAndDelete(blogID)
        if(blogs){
            return errormessage(res,200,`blogs deleted succefully`)
        }else{
            return errormessage(res,400,`no blogs found by ${blogID}`)
        }
    }
    static async updateBlog(req,res){
        const blogID = req.params.id
        const blogs = await Blogs.findByIdAndUpdate(blogID,req.body,{new:true})
        if(blogs){
            return successmessage(res,200,`blogs updated successfully`,blogs)
        }else{
            return errormessage(res,400,`no blog updated`)
        }
    }

    static async likeBlog(req, res) {
        try {
            const blogID = req.params.id;
            const userID = req.user.id; 

            const blog = await Blogs.findById(blogID);
            if (!blog) {
                return errormessage(res, 404, 'Blog not found');
            }

            if (blog.likes.includes(userID)) {
                return errormessage(res, 400, 'You already liked this blog');
            }

            blog.likes.push(userID);
            await blog.save();

            return successmessage(res, 200, 'Blog liked successfully', blog);
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }

    static async unlikeBlog(req, res) {
        try {
            const blogID = req.params.id;
            const userID = req.user.id;

            const blog = await Blogs.findById(blogID);
            if (!blog) {
                return errormessage(res, 404, 'Blog not found');
            }

            if (!blog.likes.includes(userID)) {
                return errormessage(res, 400, 'You have not liked this blog');
            }

            blog.likes = blog.likes.filter(id => id.toString() !== userID);
            await blog.save();

            return successmessage(res, 200, 'Blog unliked successfully', blog);
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }
    static async commentBlog(req, res) {
        try {
            const blogID = req.params.id;
            const { comment } = req.body;
            const userID = req.user.id;

            const blog = await Blogs.findById(blogID);
            if (!blog) {
                return errormessage(res, 404, 'Blog not found');
            }

            blog.comments.push({ userId: userID, comment });
            await blog.save();

            return successmessage(res, 200, 'Comment added successfully', blog);
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }

    static async getComments(req, res) {
        try {
          const blogID = req.params.id;
          const blog = await Blogs.findById(blogID).populate('comments.userId', 'username'); // Assuming comments are linked to users
          
          if (!blog) {
            return errormessage(res, 404, 'Blog not found');
          }
      
          return successmessage(res, 200, 'Comments fetched successfully', blog.comments);
        } catch (error) {
          console.error('Error occurred:', error);
          return errormessage(res, 500, 'Internal server error');
        }
      }
      
}
export default BlogsController