import express from "express";
import userCotroller from "../controller/userController";
import dataChequer from "../middleware/dataChequer";

const router = express.Router()

router.post("/",dataChequer.inputempty,dataChequer.emailExist,userCotroller.createUser)
router.get("/",userCotroller.getAllUser)
router.delete("/",userCotroller.deleteAllUser)
router.get("/:id",userCotroller.getOneUser)
router.delete("/:id",userCotroller.deleteOneUser)
router.patch("/:id",userCotroller.updateUser)


export default router