import nodemailer from "nodemailer";

export const sendMailToUser = async ({
  email,
  emailType,
  userId,
} : any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "niladri@nil.com", // sender address
      to: email, // list of receivers
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
      html: "<b>Hello world?</b>", // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", mailResponse.messageId);
    return mailResponse;
  } catch (error) {
    console.log("Error sending mail", error);
    throw new Error("Error sending mail");
  }
};
