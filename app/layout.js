import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Your private dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <SidebarProvider>
          <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <div className="flex flex-1 w-full relative">
              <Sidebar />
              <main className="flex-1 p-4 overflow-auto">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

