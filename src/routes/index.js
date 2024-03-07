import express from "express";
import userRoutes from './userRoutes.js'
import messageRoutes from './messageRoutes.js'

const router = express.Router();

router.use("/user",userRoutes)
router.use("/message",messageRoutes)

export default router