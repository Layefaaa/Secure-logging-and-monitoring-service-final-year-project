import fs from "fs";
import path from "path";

export default async function generateEmailTemplate({
  serviceLink,
  confirmationLink,
}: {
  serviceLink: string;
  confirmationLink: string;
}) {
  try {
    // Define the path to the HTML template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "email-confirmation.html"
    );

    // Read the HTML template
    let template = fs.readFileSync(templatePath, "utf-8");
    return (template = template
      .replace(/{{SERVICE_LINK}}/g, serviceLink)
      .replace(/{{CONFIRMATION_LINK}}/g, confirmationLink));
  } catch (error) {
    // console.log({ errorLoading: error });
  }
}



export  async function generateBlockMsgTemplate({
  serviceLink,
  userName
}: {
  serviceLink: string;
  userName:string
}) {
  try {
    // Define the path to the HTML template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "blockUser.html"
    );

    // Read the HTML template
    let template = fs.readFileSync(templatePath, "utf-8");
    return (template = template
      .replace(/{{SERVICE_LINK}}/g, serviceLink)
      .replace(/{{USERNAME}}/g, userName));
  } catch (error) {
    // console.log({ errorLoading: error });
  }
}




const currentYear: number = new Date().getFullYear();

export  async function generateUnBlockMsgTemplate({
  serviceLink,
  userName
}: {
  serviceLink: string;
  userName:string,
}) {
  try {
    // Define the path to the HTML template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "unblockUser.html"
    );

    // Read the HTML template
    let template = fs.readFileSync(templatePath, "utf-8");
    return (template = template
      .replace(/{{SERVICE_LINK}}/g, serviceLink)
      .replace(/{{YEAR}}/g, currentYear.toString())
      .replace(/{{SUPPORT_LINK}}/g, serviceLink)
      .replace(/{{USERNAME}}/g, userName));
  } catch (error) {
    // console.log({ errorLoading: error });
  }
}





export  async function generateUserMsgTemplate({
  serviceLink,
  userName,
  msg,

}: {
  serviceLink: string;
  userName:string,
  msg:string
}) {
  try {
    // Define the path to the HTML template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "sendMsg.html"
    );


    let template = fs.readFileSync(templatePath, "utf-8");
    return (template = template
      .replace(/{{SERVICE_LINK}}/g, serviceLink)
      .replace(/{{MESSAGE_BODY}}/g, msg)
      .replace(/{{CTA_TEXT}}/g, serviceLink)
      .replace(/{{SUPPORT_LINK}}/g, serviceLink)
      .replace(/{{YEAR}}/g,  currentYear.toString())
      .replace(/{{USERNAME}}/g, userName));
    
    
  } catch (error) {
    // console.log({ errorLoading: error });
  }
}
