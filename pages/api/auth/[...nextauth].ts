import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import { findOrCreateUserWithOAuth } from "@/api/services/authService";

function validateEnv() {
  const requiredEnv = [
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "APPLE_CLIENT_ID",
    "APPLE_CLIENT_SECRET",
    "NEXTAUTH_SECRET",
  ];

  requiredEnv.forEach((env) => {
    if (!process.env[env]) {
      throw new Error(`Missing environment variable: ${env}`);
    }
  });
}

validateEnv();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account?.provider) {
        console.error("OAuth provider is missing");
        return false;
      }

      if (!user.email || !user.name) {
        console.error("User email or name is missing");
        return false;
      }

      try {
        const dbUser = await findOrCreateUserWithOAuth(
          user.email,
          user.name,
          account.provider
        );
        user.id = dbUser.id;
        return true;
      } catch (err) {
        console.error(`Error during sign-in with ${account.provider}`, err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
