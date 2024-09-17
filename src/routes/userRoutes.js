import express from "express";
import userCotroller from "../controller/userController.js";
import dataChequer from "../middleware/dataChequer.js";
import validator from "../middleware/validator.js";
import verifyAccess from "../middleware/verifyAccess.js";

const router = express.Router()

router.post("/",dataChequer.inputempty,dataChequer.emailExist,validator.userAccountRule(),validator.inputvalidator,userCotroller.createUser)
router.get("/",userCotroller.getAllUser)
router.delete("/",userCotroller.deleteAllUser)
router.get("/:id",userCotroller.getOneUser)
router.delete("/:id",userCotroller.deleteOneUser)
router.patch("/:id",userCotroller.updateUser)
router.post("/login",userCotroller.login)


export default router