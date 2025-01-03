import Message from "../model/messages.js";
import errormessage from "../itills/errorMessage.js";
import successMessage from '../itills/successMessage.js';

class MessageController {
    static async sendmessage(req,res){
        const {fullName,email,campanyName,message} = req.body

        try {
            const messages = await Message.create({fullName,email,campanyName,message})
            if(messages){
                return successMessage(res,201,`message sent`,messages)
            }else{
                return errormessage(res,401,`message not sent`)
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, `internal server error`)
        } 
    }
    static async viewAllMessage(req,res){
        const message= await Message.find();
        if(message){
            return successMessage(res,200,`all messages retrived`,message)
        }else{
            return errormessage(res,400,`no messages found`)
        }
    }

    static async deleteMessage(req,res){
        const messageID = req.params.id;
        const messages = await Message.findByIdAndDelete(messageID)

        if(messages){
            return successMessage(res,200,`message deleted`,messages)
        }else{
            return errormessage(res,401,`message not deleted`)
        }
    }
}
export default MessageController