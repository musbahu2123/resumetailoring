// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose"; // --- NEW: IMPORT MONGOOSE ---
import dbConnect from "@/lib/dbConnect"; // --- NEW: IMPORT DB CONNECT UTILITY ---

// We must call dbConnect() to ensure Mongoose is connected before initializing the adapter
dbConnect();

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Use the Mongoose connection's client for the adapter
  adapter: MongoDBAdapter(mongoose.connection.getClient()),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // 🔑 Force account selection
          access_type: "offline", // (optional) get refresh token
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
