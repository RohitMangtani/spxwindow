import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPXwindow — Live SPX6900 Dashboard",
  description:
    "Real-time structural health dashboard for SPX6900. Conviction metrics, whale behavior, correlation, supply analysis, and invalidation monitoring.",
  openGraph: {
    title: "SPXwindow — Live SPX6900 Dashboard",
    description: "Real-time structural health dashboard for SPX6900.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPXwindow — Live SPX6900 Dashboard",
    description: "Real-time structural health dashboard for SPX6900.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen">
          <header className="border-b border-[var(--border)] px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-lg font-semibold tracking-tight">
                SPX<span className="text-[var(--fg-muted)]">window</span>
              </h1>
              <span className="text-xs text-[var(--fg-muted)]">Live Dashboard</span>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
          <footer className="border-t border-[var(--border)] px-6 py-4 text-center text-xs text-[var(--fg-muted)]">
            Data from CoinGecko, DexScreener, Etherscan. Not financial advice.
            Research data snapshots may be delayed.
          </footer>
        </div>
      </body>
    </html>
  );
}
