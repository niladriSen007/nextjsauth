import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "User logged out",
      success: true,
    });

    response.cookies.set("token", "", {
      maxAge: 0,
      httpOnly: true,
      expires: new Date(0),
    });

    return response;

  } catch (error) {
    console.log("Error sending mail", error);
    return NextResponse.json({ error });
  }
};
