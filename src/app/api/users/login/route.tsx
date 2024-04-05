import { connection } from "@/database/connection";
import { comparePass } from "@/helpers/comparePass";
import { generateToken } from "@/helpers/generateToken";
import { hashPassWord } from "@/helpers/hashPass";
import { sendMailToUser } from "@/helpers/mailers";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connection();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
      });
    }

    const isPasswordValid = await comparePass(password, user?.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        message: "Invalid password",
      });
    }

    const token = generateToken(user._id);

    const response = NextResponse.json({
      message: "User logged in",
      token,
      success: true,
    });

    response.cookies.set("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log("Error sending mail", error);
    return NextResponse.json({ error });
  }
};
