import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/components/ClientLayout"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Your private dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ClientLayout>{children}</ClientLayout> 
      </body>
    </html>
  );
}

