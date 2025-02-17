import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../services/prisma";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      id: "github",
      name: "GitHub",
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  debug: true,
  callbacks: {
    async session({ session, user, token }) {
      console.log("session is: ", session);
      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      if (token?.surveyed !== undefined) {
        session.user.surveyed = token.surveyed;
      }
      return session;
    },
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
      console.log("sign in callback triggered");

      await prisma.user.upsert({
        where: { email: profile.email },
        create: {
          email: profile.email,
          // username: profile.email.split('@')[0],
          name: profile.name ?? "unknown",
        },
        update: {
          name: profile.name,
        },
      });
      return true;
    },
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
        select: { surveyed: true },
      });

      token.surveyed = dbUser?.surveyed || false;
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
