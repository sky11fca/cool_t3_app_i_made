import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import * as process from "node:process";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    DiscordProvider,
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
        async authorize(Credentials){
          if(!Credentials?.username || !Credentials?.password) return null;

          const username = Credentials.username;
          const password = Credentials.password as string;

          const user = await db.user.findFirst({
            where: {
              username,
            },
            select: {
              id: true,
              username: true,
              email: true,
              password: true,
            },
          });
          if(!user) {
            return {
              message: "User doesn'texist",
              success: false
            };
          }

          if(!user.password){
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if(!passwordMatch){
            return{
              message: "Invalid password",
              success: false
            }
          }

          return{
            id: user.id,
            name: user.username,
            username: user.username,
            email: user.email,
            success: true
          }
        }
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({token, user}){
      if(user){
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },

    async session({session, token}){
      if(session.user && token.id){
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email!;
      }

      return session;
    },
  },

  cookies: {
    sessionToken:{
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path:"/",
      },
    },
  },

  pages:{
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 60*60
  },

  secret: process.env.AUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
