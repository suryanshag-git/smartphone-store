import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: '1Fi Store | Buy Flagship Smartphones on Mutual Fund EMI',
  description: 'Purchase flagship smartphones like iPhone 17 Pro, Galaxy S24 Ultra, and Pixel 9 Pro using collateralized mutual fund-backed EMI financing plans with 0% portfolio liquidation.',
  keywords: 'Mutual Fund EMI, iPhone on EMI, SnapMint, 1Fi, Smartphone Financing, 0% Interest EMI, Collateral Credit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-slate-950">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-800/80 bg-slate-950 py-10 mt-16 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 space-y-3">
              <p className="font-semibold text-slate-400">
                1Fi Smartphone Store • Mutual Fund Backed EMI Financing Platform
              </p>
              <p>
                All loans are collateralized against mutual fund folios via RBI-regulated NBFC partners. 0% portfolio liquidation guarantees uninterrupted SIP compounding growth.
              </p>
              <p className="text-[10px] text-slate-600">
                © {new Date().getFullYear()} 1Fi Technologies. Demo MVP application.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
