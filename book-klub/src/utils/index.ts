import { IEmailRequest } from "../interfaces/email";
import { createTransport } from "nodemailer";
import "dotenv/config";

const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: text,
    })
    .then(() => {
      console.log("Email sent with success");
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error sending email, try again later");
    });
};

export { sendEmail };
