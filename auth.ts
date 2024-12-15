import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // Sessions expire after 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // After successful sign-in, save the user data
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        // If the user doesn't exist, create a new user
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name,
            },
          });
        }
      }

      return true;
    },
    async session({ session, token }) {
      // Add the user id to the session (can be used to fetch user data)
      //@ts-ignore
      session.user.id = token.id;
      //@ts-ignore
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
});
