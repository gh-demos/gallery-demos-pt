import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Camera } from "lucide-react";
import { ThemeProvider, ThemeToggle } from "@/components/ui";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photo Gallery & Portfolio",
  description: "A curated collection of photographs and creative works showcasing a personal portfolio.",
};

const themeScript = `(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Navigation Header */}
          <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <Camera className="h-8 w-8 text-blue-600" />
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Portfolio Gallery
                  </h1>
                </Link>
                <nav className="flex items-center gap-6">
                  <Link href="/gallery" className="nav-link">
                    Gallery
                  </Link>
                  <Link href="/upload" className="nav-link">
                    Upload
                  </Link>
                  <Link href="/admin" className="btn-primary">
                    Admin
                  </Link>
                  <ThemeToggle />
                </nav>
              </div>
            </div>
          </header>
          {children}
          {/* Footer */}
          <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-12">
            <div className="container mx-auto px-4 py-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-6 w-6 text-blue-600" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  &copy; {new Date().getFullYear()} Portfolio Gallery. All rights reserved.
                </span>
              </div>
              <nav className="flex items-center gap-4">
                <Link href="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:underline">
                  Terms of Service
                </Link>
              </nav>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

