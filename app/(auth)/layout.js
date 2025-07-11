import "../globals.css";

export const metadata = {
  title: "Auth",
  description: "Login or Sign Up",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
