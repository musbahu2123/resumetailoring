// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      subscription?: string;
    };
  }

  interface User {
    id: string;
    subscription?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    subscription?: string;
  }
}