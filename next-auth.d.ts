
import NextAuth,{type DefaultSession} from "next-auth"
import {JWT} from "next-auth/jwt"

export type     ExtendedUser = DefaultSession["STUDENT"] & {
role : "ADMIN" | "STUDENT" | "EMPLOYER"
}


declare module  "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "STUDENT" | "ADMIN" | "EMPLOYER"
    }
}