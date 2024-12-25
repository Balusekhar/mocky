import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // Sessions expire after 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Find or create user in Prisma DB
        const existingUser = await prisma.user.upsert({
          where: { email: user.email as string },
          update: {}, // No update needed
          create: {
            email: user.email as string,
            name: user.name,
          },
        });

        // Replace Google-provided ID with Prisma-generated ID
        user.id = existingUser.id; // Attach Prisma ID to the user
      }

      return true; // Allow sign-in
    },
    async jwt({ token, user }) {
      // Attach the Prisma user ID to the token
      if (user) {
        token.id = user.id; // Prisma ID
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the Prisma user ID to the session
      //@ts-ignore
      session.user.id = token.id; // Prisma ID
      //@ts-ignore
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
});
