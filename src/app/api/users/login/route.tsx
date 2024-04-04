import { hashPassWord } from "@/helpers/hashPass";
import { sendMailToUser } from "@/helpers/mailers";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, username, password } = reqBody;

    const issxerExists = await User.findOne({
      email,
    });

    if (issxerExists) {
      return NextResponse.json({
        message: "User already exists",
      });
    }

    const hashedPass = await hashPassWord(password);

    const newUser = new User({
      email,
      username,
      password: hashedPass,
    });

    const savedUser = await newUser.save();

    await sendMailToUser({
      email,
      emailType: "VERIFY",
      userId: savedUser?._id,
    });

    return NextResponse.json({
      message: "User created",
      success: true,
    });
  } catch (error) {
    console.log("Error sending mail", error);
    return NextResponse.json({ error });
  }
};
