import type { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { SIGN_UP } from "./endpoint";

const maxAge = 60 * 60 * 24 * 30;
export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge,
  },
  jwt: {
    maxAge,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req): Promise<any> {
        const signInResponse: any = await axiosInstance.post(
          SIGN_UP,
          credentials
        );
        
  
        if (signInResponse.data.success) {
          const { token }: any = signInResponse?.data?.result;
          const {user}:any = jwtDecode(token) || {}
          return { accessToken: token, user };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account }: any) {
  
      if (user) {
     
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (!token?.accessToken) {
        return false;
      } else {
        session.accessToken = token?.accessToken;
        session.user = token?.user
        return session;
      }
    },
  },
} satisfies NextAuthOptions;
