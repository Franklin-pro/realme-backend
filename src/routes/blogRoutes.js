import express from 'express';
import BlogController from '../controller/blogController.js';
import verifyAccess from '../middleware/verifyAccess.js';

const router = express.Router();

router.post("/",verifyAccess("admin"),BlogController.createBlogs)
router.get("/",BlogController.getAllBlogs)
router.get("/:id",BlogController.getOneBlogs)
router.delete("/",verifyAccess("admin"),BlogController.deleteAllBlogs)
router.delete("/:id",verifyAccess("admin"),BlogController.deleteOneBlogs)

export default router