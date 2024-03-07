import express from 'express';
import messageController from '../controller/messageController.js';

const router = express.Router();

router.post("/",messageController.createMessage)
router.get("/",messageController.getAllMessage)
router.get("/:id",messageController.getOneMessage)
router.delete("/",messageController.deleteAllMessage)
router.delete("/:id",messageController.deleteOneMessage)

export default router