import "./globals.css";
import Link from "next/link";
import FloatingStartButton from "./components/FloatingStartButton";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/sooryx-favicon.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-white pt-28 md:pt-20">
        {/* GLOBAL NAVBAR */}
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4 lg:px-10 lg:py-5">
            <Link
              href="/"
              className="shrink-0 rounded-full px-2 py-1 text-lg font-semibold text-white transition duration-300 hover:bg-white/5 hover:text-amber-300 md:text-[22px]"
            >
              Sooryx
            </Link>

            <div className="hidden flex-1 flex-wrap items-center justify-end gap-2 text-xs md:flex lg:gap-3 lg:text-sm">
              <Link
                href="/billshield"
                style={{
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #fbbf24, #facc15, #10b981)",
                  padding: "10px 24px",
                  borderRadius: "999px",
                  fontWeight: 700,
                  color: "#020617",
                  boxShadow: "0 6px 18px 0 rgba(251, 191, 36, 0.35)",
                  transition: "all 0.25s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                className="hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(251,191,36,0.45)] active:translate-y-0 active:scale-[0.98]"
              >
                BillShield
              </Link>
              <Link href="/" className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-white/95 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]" style={{ cursor: "pointer" }}>Home</Link>
              <Link href="/calculator" className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-white/95 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]" style={{ cursor: "pointer" }}>Calculate Savings</Link>
              <Link href="/how-it-works" className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-white/95 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]" style={{ cursor: "pointer" }}>How it Works</Link>
              <Link href="/contact" className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-white/95 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] active:translate-y-0 active:scale-[0.98]" style={{ cursor: "pointer" }}>Contact Us</Link>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-3 md:hidden">
            <div className="space-y-2">
              <Link
                href="/billshield"
                style={{
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #fbbf24, #facc15, #10b981)",
                  padding: "9px 14px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  color: "#020617",
                  boxShadow: "0 4px 14px 0 rgba(251, 191, 36, 0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                }}
                className="w-full transition duration-150 active:scale-[0.99] active:shadow-[0_8px_18px_rgba(251,191,36,0.45)]"
              >
                BillShield
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/" className="rounded-full border border-white/20 px-3 py-2 text-center text-sm text-white/90 transition duration-150 active:scale-[0.98] active:border-amber-300 active:bg-white/10 active:text-white active:shadow-[0_8px_18px_rgba(251,191,36,0.25)]">Home</Link>
                <Link href="/calculator" className="rounded-full border border-white/20 px-3 py-2 text-center text-sm text-white/90 transition duration-150 active:scale-[0.98] active:border-amber-300 active:bg-white/10 active:text-white active:shadow-[0_8px_18px_rgba(251,191,36,0.25)]">Savings</Link>
                <Link href="/how-it-works" className="rounded-full border border-white/20 px-3 py-2 text-center text-sm text-white/90 transition duration-150 active:scale-[0.98] active:border-amber-300 active:bg-white/10 active:text-white active:shadow-[0_8px_18px_rgba(251,191,36,0.25)]">How it Works</Link>
                <Link href="/contact" className="rounded-full border border-white/20 px-3 py-2 text-center text-sm text-white/90 transition duration-150 active:scale-[0.98] active:border-amber-300 active:bg-white/10 active:text-white active:shadow-[0_8px_18px_rgba(251,191,36,0.25)]">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        {children}
        
        <Footer />
        <FloatingStartButton />
      </body>
    </html>
  );
}
