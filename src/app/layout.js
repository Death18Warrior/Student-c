import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/use-toast";
import { getStudentProfile } from "@/lib/student/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "C2E - LMS",
  description: "LMS",
};

export default async function RootLayout({ children }) {
  const student = await getStudentProfile();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Navbar student={student} />
        <ToastProvider>
          {children}
        </ToastProvider >
        <Footer />
      </body>
    </html>
  );
}
