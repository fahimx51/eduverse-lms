import NextAuth, { User, Account, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

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
        async signIn({ user, account }: { user: User; account: Account | null }) {
            if (account?.provider === "google" || account?.provider === "github") {
                try {
                    // Added "user/" to target your Express user.route path
                    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}user/social-auth`, {
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
                        const errorText = await response.text();
                        console.error("Backend returned error:", response.status, errorText);
                        return false;
                    }

                    return true;
                } catch (error) {
                    console.error("MERN Backend Social Auth Error:", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session }: { session: CustomSession }) {
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };