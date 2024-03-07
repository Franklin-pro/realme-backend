import express from "express";
import userRoutes from './userRoutes.js'
import messageRoutes from './messageRoutes.js'
import blogRoutes from './blogRoutes.js'


const router = express.Router();

router.use("/user",userRoutes)
router.use("/message",messageRoutes)
router.use("/blogs",blogRoutes)

export default router