import nodemailer from 'nodemailer'

const sendEmail = async(allUserInfo,newsData);
const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

const emailOPtion= {
from: process.env.EMAIL,
to :allUserInfo.email,

subject:`welcome dear ${allUserInfo.firstName}, new post are added at ${postedAt}`,
html:`<p>message from user</p>`
}

transporter.sendMail(emailOPtion,function(err,info){
    if(err){
        console.log(err)
    }else{
        console.log(info)
    }

})
export default sendEmail