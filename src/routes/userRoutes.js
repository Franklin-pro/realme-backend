import express from "express";
import userCotroller from "../controller/userController.js";
import dataChequer from "../middleware/dataChequer.js";
import Validator from "../middleware/validator.js";
import verifyAccess from "../middleware/verifyAccess.js";

const router = express.Router()

router.post("/",dataChequer.inputempty,dataChequer.emailExist,Validator.userAccount(),Validator.inputValidator,userCotroller.createUser)
router.get("/",verifyAccess("admin"),userCotroller.getAllUser)
router.delete("/",userCotroller.deleteAllUser)
router.get("/:id",userCotroller.getOneUser)
router.delete("/:id",userCotroller.deleteOneUser)
router.patch("/:id",userCotroller.updateUser)
router.post("/login",userCotroller.login)


export default router