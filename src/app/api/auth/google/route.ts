import { NextRequest, NextResponse } from "next/server";
import { findOrCreateUserWithOAuth } from "../../services/authService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing Authorization Code" },
      { status: 400 }
    );
  }

  try {
    const googleAccessToken = await getGoogleAccessToken(code);
    const googleUser = await getGoogleUser(googleAccessToken);

    if (!googleUser.email || !googleUser.name) {
      return NextResponse.json(
        { error: "Google User Does Not Have Email or Name" },
        { status: 400 }
      );
    }

    const user = await findOrCreateUserWithOAuth(
      googleUser.email,
      googleUser.name
    );
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("Google OAuth Error:", err);
    return NextResponse.json(
      { error: "Failed to authenticate with Google" },
      { status: 500 }
    );
  }
}

// additional google logic

async function getGoogleAccessToken(code: string) {
  const url = "https://oauth2.googleapis.com/token";
  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: "http://localhost:3000/api/auth/google",
    grant_type: "authorization_code",
  });

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to Exchange Authorization Code for Access Token");
  }

  const data = await response.json();
  return data.access_token;
}

async function getGoogleUser(accessToken: string) {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to Fetch Google User Information");
  }

  return await response.json();
}
