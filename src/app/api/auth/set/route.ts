import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

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

export async function GET(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    const video_id = searchParams.get("video_id");

    if (!video_id) {
      return Response.json({ error: "video_id is required" }, { status: 400 });
    }

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://notegpt.io/api/v2/video-transcript?platform=youtube&video_id=${video_id}`,
      headers: {
        Cookie:
          'anonymous_user_id=9031b0de-c48d-44ab-b35e-e56667f35ffa; sbox-guid=MTc2MzU3NzU0M3w0NzN8OTExNjI4MjIw; _ga=GA1.2.662835758.1763577537; _gid=GA1.2.856908565.1763577546; _gat_gtag_UA_252982427_14=1; g_state={"i_l":0,"i_ll":1763577546323,"i_b":"UCacPWl45ul/efxqOHiLgLSVidU4s0Yu9KxTWa8OI6g"}; _ga_PFX3BRW5RQ=GS2.1.s1763577537$o1$g0$t1763577564$j33$l0$h821821321',
      },
    };

    const response = await axios.request(config);

    return Response.json(response.data, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
