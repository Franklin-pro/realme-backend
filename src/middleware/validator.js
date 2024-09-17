
import { check,validationResult } from "express-validator"
import errorMessage from "../itills/errorMessage.js"

class validator {
    static inputvalidator(req, res, next) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const errorMsgs = errors.array().map(err => err.msg);
            return errorMessage(res, 401, errorMsgs);
        }
        return next();
    }

    static userAccountRule() {
        return [
            check("userName", "please write your userName correctly").trim().isAlpha(),
            check("email", "please write your email correctly").trim().isEmail(),
            check("password", "please write your stronger password").trim().isStrongPassword(),
        ];
    }
}
export default validator;

