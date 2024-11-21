import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // Sessions expire after 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  // callbacks:{
  //   session:{

  //   }
  // }
})