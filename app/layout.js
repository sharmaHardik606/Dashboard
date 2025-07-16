import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout"; 

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});


export const metadata = {
  title: "Dashboard",
  description: "Your private dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen`}
      >
        <ClientLayout>{children}</ClientLayout> 
      </body>
    </html>
  );
}

