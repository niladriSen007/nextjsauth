import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token: any = request.cookies.get("token")?.value || '';
    if (!token) {
      return NextResponse.json({
        message: "No token found",
        });
    }
    const data: any = jwt.verify(token, process.env.JWT_SECRET! as string);

    return data?.id;
  } catch (error) {
    console.log("Error getting data from token", error);
    return NextResponse.json({ error });
  }
};
