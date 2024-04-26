import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const handler = NextAuth({
    pages:{
        signIn:"/"
    },
    providers: [
        
        CredentialsProvider({
         
          name: 'Credentials',
          
          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
           
            const res = await fetch("http://localhost:8000/api/auth/login", {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
            if (res.ok && user) {
              return user
            }
            return null
          }
        })
      ]
})

export { handler as GET, handler as POST }