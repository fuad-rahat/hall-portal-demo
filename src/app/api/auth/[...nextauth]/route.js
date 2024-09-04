import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'; 
import { connectDB } from "@/lib/connectDB";

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }, // Password field
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                if (!email || !password) {
                    return null; // Invalid input
                }

                const db = await connectDB();

                // Check in the 'students' collection first
                let user = await db.collection('students').findOne({ email });
                if (user) {
                    const passwordMatch = bcrypt.compareSync(password, user.password); 
                    if (!passwordMatch) return null; 
                    return { ...user, userType: 'student' }; 
                }

                user = await db.collection('admin').findOne({ email });
                if (user) {
                    const passwordMatch = bcrypt.compareSync(password, user.password); // Compare password
                    if (!passwordMatch) return null; 
                    return { ...user, userType: 'admin' }; 
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: '/', 
    },
});

export { handler as GET, handler as POST };
