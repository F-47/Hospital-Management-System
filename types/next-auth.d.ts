import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    expires: string;
    user: {
      //   code: number;
      //   data: {};
      //   status: boolean;
      //   token: string;
      //   validation: [];
      //   message: string;
      //   iat: number;
      //   exp: number;
      //   jti: string;
    };
  }
}
