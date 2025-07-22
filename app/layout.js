import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import StoreProvider from "./store-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Dashboard",
  description: "Your private dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased min-h-screen `}>
        <StoreProvider>
          <ClientLayout>{children}</ClientLayout>
        </StoreProvider>
      </body>
    </html>
  );
}



