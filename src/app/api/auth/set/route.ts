import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { access_token, refresh_token } = await req.json();
  if (!access_token) {
    return NextResponse.json(
      { error: "Missing access token" },
      { status: 400 }
    );
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  };

  (await cookies()).set("sb-access-token", access_token, cookieOptions);
  (await cookies()).set("sb-refresh-token", refresh_token, cookieOptions);

  return NextResponse.json({ success: true });
}
