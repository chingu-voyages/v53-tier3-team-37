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
    const githubAccessToken = await getGithubAccessToken(code);
    const githubUser = await getGithubUser(githubAccessToken);

    if (!githubUser.email || !githubUser.name) {
      return NextResponse.json(
        { error: "GitHub User Does Not Have Email or Name" },
        { status: 400 }
      );
    }

    const user = await findOrCreateUserWithOAuth(
      githubUser.email,
      githubUser.name
    );
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("GitHub OAuth Error:", err);
    return NextResponse.json(
      { error: "Failed to Authenticate with GitHub" },
      { status: 500 }
    );
  }
}

// additional github logic
async function getGithubAccessToken(code: string) {
  const url = "https://github.com/login/oauth/access_token";
  const body = new URLSearchParams({
    code,
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to Exchange Authorization Code for Access Token");
  }

  const data = await response.json();
  return data.access_token;
}

async function getGithubUser(accessToken: string) {
  const response = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user information");
  }

  const user = await response.json();

  //    github may not give us the email in the primary request
  if (!user.email) {
    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (emailResponse.ok) {
      const emails = await emailResponse.json();
      //   not sure that we can have a type for this, so....
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user.email = emails.find((email: any) => email.primary)?.email;
    }
  }
  return user;
}
