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
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10 md:py-5">
            <div className="text-lg font-semibold md:text-[22px]">Sooryx</div>

            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/billshield"
                style={{
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #fbbf24, #facc15, #10b981)",
                  padding: "8px 20px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  color: "#020617",
                  boxShadow: "0 4px 14px 0 rgba(251, 191, 36, 0.4)",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                BillShield
              </Link>
              <Link href="/" style={{ cursor: "pointer" }}>Home</Link>
              <Link href="/calculator" style={{ cursor: "pointer" }}>Calculate Savings</Link>
              <Link href="/how-it-works" style={{ cursor: "pointer" }}>How it Works</Link>
              <Link href="/contact" style={{ cursor: "pointer" }}>Contact Us</Link>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-2 md:hidden">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link
                href="/billshield"
                style={{
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #fbbf24, #facc15, #10b981)",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  color: "#020617",
                  boxShadow: "0 4px 14px 0 rgba(251, 191, 36, 0.3)",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                }}
              >
                BillShield
              </Link>
              <Link href="/" className="px-2 text-sm">Home</Link>
              <Link href="/calculator" className="px-2 text-sm">Calculate Savings</Link>
              <Link href="/how-it-works" className="px-2 text-sm">How it Works</Link>
              <Link href="/contact" className="px-2 text-sm">Contact Us</Link>
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
