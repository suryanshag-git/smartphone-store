import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: '1Fi Store | Buy Phones on Mutual Fund EMI',
  description: 'Buy flagship smartphones like iPhone 17 Pro and Galaxy S24 Ultra without selling your mutual funds. Simple monthly plans with zero interest options.',
  keywords: 'Smartphone EMI, iPhone EMI, Mutual Fund Financing, 0% Interest EMI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white py-12 mt-20 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 space-y-3">
              <p className="font-semibold text-slate-700 text-sm">
                1Fi Store • Smart Phone Financing for Investors
              </p>
              <p className="max-w-2xl mx-auto text-slate-500">
                Your mutual fund investments stay pledged in your folio while you pay monthly. Zero portfolio selling means your money keeps growing during your entire tenure.
              </p>
              <p className="text-[11px] text-slate-400 pt-2">
                © {new Date().getFullYear()} 1Fi Technologies. Built for smart buyers.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
