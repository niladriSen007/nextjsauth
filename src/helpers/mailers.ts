import { User } from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendMailToUser = async ({ email, emailType, userId }: any) => {
  try {
    const tokenForVerifyOrForgotPass = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verificationToken: tokenForVerifyOrForgotPass,
        verificationTokenExpires: new Date(Date.now() + 3600000),
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: tokenForVerifyOrForgotPass,
        forgotPasswordExpires: new Date(Date.now() + 3600000),
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3de0ef750aa81b",
        pass: "9871fc2afa4e0a",
      },
    });

    const mailOptions = {
      from: "niladri@nil.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${tokenForVerifyOrForgotPass}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
        or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/verifyemail?token=${tokenForVerifyOrForgotPass}
        </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", mailResponse.messageId);
    return mailResponse;
  } catch (error) {
    console.log("Error sending mail", error);
    throw new Error("Error sending mail");
  }
};
