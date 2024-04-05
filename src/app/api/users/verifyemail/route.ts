import { connection } from "@/database/connection";

import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connection();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { token: verificationToken } = reqBody;

    if (!verificationToken) {
      return NextResponse.json({
        message: "Token is required",
      });
    }

    const user = await User.findOne({
      verificationToken,
      verificationTokenExpires: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      return NextResponse.json({
        message: "Invalid or expired token",
      });
    }

    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    user.isVerified = true;

    await user.save();

    return NextResponse.json({
      message: "Email verified",
      success: true,
    });

  } catch (error: any) {
    console.log("Error sending mail", error);
    return NextResponse.json({ error });
  }
};
