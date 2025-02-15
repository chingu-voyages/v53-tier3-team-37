import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      surveyed?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    surveyed?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    surveyed?: boolean;
  }
}

