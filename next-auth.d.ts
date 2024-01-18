import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: unmber;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}
