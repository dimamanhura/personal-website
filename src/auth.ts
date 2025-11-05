import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";
import { db } from "@/db";
import { compareSync } from "bcrypt-ts-edge";
import CredentialsProvider from "next-auth/providers/credentials";
import paths from "./paths";

export const config: NextAuthConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await db.user.findFirst({
          where: {
            email: credentials.email as string,
            active: true,
          },
        });

        // Check if user exists and if the password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );

          // If password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }
        // If user does not exist or password does not match return null
        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async redirect() {
      return paths.projectsAdmin();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
