import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            // Check if they are using Social Login
            if (account.provider === "google" || account.provider === "github") {
                try {
                    // Send user data to your MERN backend (Node/Express)
                    // This matches the 'social-auth' route you likely have in your controllers
                    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}social-auth`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                            avatar: user.image,
                        }),
                    });
                    return true;
                } catch (error) {
                    console.error("MERN Backend Social Auth Error:", error);
                    return false; // Deny login if backend call fails
                }
            }
            return true;
        },
        async session({ session, token }) {
            // This ensures the user data is available in useSession() hook
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };