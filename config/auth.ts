import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { UserManager } from "@/server/controllers/user.service";

interface PayloadTy{
  firstname:string,
  lastname:string,
  email?:string,
  image?:string
}

const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
export const authOptions: AuthOptions = {
    providers: [
      GoogleProvider({
        clientId:GOOGLE_CLIENT_ID as string,
        clientSecret: GOOGLE_CLIENT_SECRET as string,
      }),
      GithubProvider({
        clientId: process.env.GIT_CLIENT_ID as string,
        clientSecret: process.env.GIT_CLIENT_SECRET as string,
      }),
    ],
    callbacks: {
      async signIn({ user,credentials}) {
        console.log({credentials})
       const {name,image,email}=user;
       const fullName=name as string;
       const [firstName, lastName] = fullName.split(' ').map(word => word.toLowerCase());
       if(email){
        const payload:PayloadTy={firstname:firstName,lastname:lastName,email,image:image??''};
        await UserManager.getInstance().signInwIthNextAuth({email,payload})
       }

        return true
      },

  async jwt({ token, account }) {
    // Persist the OAuth access_token to the token right after signin
    if (account) {
      console.log("OAuth access_token",account)
      token.accessToken = account.access_token
    }
    return token
  },
  
  async session({ session, token, user }) {
    console.log({session})
    // Send properties to the client, like an access_token from a provider.
    // session.accessToken = token.accessToken
    return session
  },

}
  };