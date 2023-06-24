import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter<boolean>,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const dbUser = await prisma.user.findUnique({
        select: {
          owner: true,
        },
        where: {
          email: session!.user!.email as string,
        },
      });

      // @ts-ignore
      session.user.owner = dbUser!.owner;

      return session;
    },
  },
};

export default NextAuth(authOptions);
