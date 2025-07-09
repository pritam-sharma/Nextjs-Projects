import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="max-w-md mx-auto py-8">{children}</main>
      </body>
    </html>
  );
}
