import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.githubLogin = (profile as any).login;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = token.githubLogin === "nicolausmagnus";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
