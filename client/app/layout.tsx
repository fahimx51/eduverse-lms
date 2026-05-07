import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import ClientLayout from "./ClientLayout";

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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${josefin.variable} antialiased bg-white text-black dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 bg-no-repeat`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}