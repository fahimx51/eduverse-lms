'use client';
import "./globals.css";
import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/Theme-Provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} antialiased bg-white text-black dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 bg-no-repeat`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <Custom>
                {children}
              </Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom = ({ children }: { children: React.ReactNode }) => {
  // Add isError and data to the destructuring
  const { isLoading, isError, data } = useLoadUserQuery({}, {
    refetchOnMountOrArgChange: true // Ensures it tries to load on every refresh
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use queueMicrotask to avoid hydration errors
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  if (isLoading && !data && !isError) {
    return <Loader />;
  }

  return <>{children}</>;
};