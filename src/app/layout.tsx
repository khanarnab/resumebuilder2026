import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "ResumeBuilder2026",
    template: "%s | ResumeBuilder2026",
  },
  description: "Create professional resumes with ease. A modern resume builder with real-time preview and PDF export.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}