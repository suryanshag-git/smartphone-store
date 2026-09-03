import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Slate | Flagship Smartphones on Mutual Fund EMI',
  description: 'Buy flagship smartphones on Slate. Pay easy monthly installments backed by your mutual funds without selling your investments.',
  keywords: 'Slate, Smartphone EMI, Mutual Fund Financing, 0% Interest EMI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-[var(--border)] bg-[var(--card)] py-12 mt-20 text-center text-xs text-[var(--muted)]">
              <div className="max-w-7xl mx-auto px-4 space-y-2">
                <p className="font-serif text-lg font-bold text-[var(--foreground)] tracking-tight">
                  Slate<span className="text-amber-600">.</span>
                </p>
                <p className="max-w-md mx-auto text-[var(--muted)] text-xs">
                  Your mutual funds stay safely pledged while you pay monthly. Zero portfolio selling.
                </p>
                <p className="text-[11px] opacity-60 pt-2">
                  © {new Date().getFullYear()} Slate Technologies.
                </p>
              </div>
            </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
