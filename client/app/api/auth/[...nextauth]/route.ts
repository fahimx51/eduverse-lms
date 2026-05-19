import NextAuth, { User, Account, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

// Define the structure for your custom Session (optional but recommended)
interface CustomSession extends Session {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

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
        // Explicitly typed parameters to satisfy Vercel/TypeScript build
        async signIn({ user, account }: { user: User; account: Account | null }) {
            // Check if they are using Social Login using optional chaining
            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    // Send user data to your MERN backend
                    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}social-auth`, {
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

                    if (!response.ok) {
                        console.error("Backend returned error:", await response.text());
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.error("MERN Backend Social Auth Error:", error);
                    return false; // Deny login if backend call fails
                }
            }
            return true;
        },
        async session({ session }: { session: CustomSession }) {
            // This ensures the user data is available in useSession() hook
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };