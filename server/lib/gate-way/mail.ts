require("dotenv").config();
import { IUser } from "@/server/cluster/schema.interfaces";
import mailgen from "mailgen";
import nodemailer from "nodemailer";
import generateEmailTemplate, { generateBlockMsgTemplate, generateUnBlockMsgTemplate, generateUserMsgTemplate } from "./generateEmail";
import { exec } from "child_process";
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  
  },
});

const registerUser = async (name: string, userEmail: string, token: string) => {
  try {
    const confirmEmailTemplate=await generateEmailTemplate({
      serviceLink: `${process.env.SITE_DOMAIN}`,
      confirmationLink: `${process.env.SITE_DOMAIN}account/verification/?t=${token}`,
    })
    if (confirmEmailTemplate) {
      exec(`google-chrome ${confirmEmailTemplate}`, (err, stdout, stderr) => {
        if (err) {
    
          return;
        }
      });
    }
    const message = {
      from: process.env.EMAIL_USER, // Ensure this is set to the correct sender address
      to: userEmail,
      subject: "Account Verification",
       html: confirmEmailTemplate,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    return ;
  }
};

export default registerUser;







// ## toggleUserAccountStatus 


const toggleUserAccountStatus = async (name: string, userEmail: string, isblocked: boolean) => {
  let template:string | undefined
  try {
    if(isblocked){
      template = await generateBlockMsgTemplate({
        serviceLink: `${process.env.SITE_DOMAIN}` ,
        userName: name,
       })
    }else{
      template = await generateUnBlockMsgTemplate({
        serviceLink: `${process.env.SITE_DOMAIN}`,
        userName: name,
      })

    }

    const message = {
      from: process.env.EMAIL_USER, // Ensure this is set to the correct sender address
      to: userEmail,
      subject:isblocked ?'Account Suspension Notification': `Your Account Has Been Unblocked – Welcome Back, ${name}!`,
       html: template,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    return ;
  }
};



// ## send user mail 
const sendUserMail = async (name: string, userEmail: string, msg: string) => {
  let template:string | undefined
  try {
      template = await generateUserMsgTemplate({
        serviceLink:`${process.env.SITE_DOMAIN}`,
        userName:name,
        msg,
      
      })
    const message = {
      from: process.env.EMAIL_USER, // Ensure this is set to the correct sender address
      to: userEmail,
      subject:'New Notification- Log Guard',
       html: template,
    };
    await transporter.sendMail(message);
    return true;
  } catch (error) {
    return ;
  }
};



export const mailServices = {
  registerUser,
  toggleUserAccountStatus,
  sendUserMail
};
