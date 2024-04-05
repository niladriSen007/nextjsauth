import { connection } from "@/database/connection";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connection();

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({
        message: "Invalid token",
      });
    }

    const user = await User.findById({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({
        message: "User not found",
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("Error getting users", error);
    return NextResponse.json({ error });
  }
};
