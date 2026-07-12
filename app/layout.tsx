import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOURA — Personal Finance System",
  description:
    "Ringkasan keuangan rumah tangga: penghasilan, pengeluaran, dan sisa saldo.",
};

export const viewport: Viewport = {
  themeColor: "#040404",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${body.variable} ${display.variable}`}
    >
      <body className="min-h-screen bg-background">
        <QueryProvider>
          <div className="mx-auto flex min-h-screen max-w-md flex-col">
            {children}
          </div>

          <Toaster
            richColors
            position="top-center"
          />
        </QueryProvider>
      </body>
    </html>
  );
}