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
      <body style={{ background: "#020617", color: "white", paddingTop: "80px" }}>
        {/* GLOBAL NAVBAR */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 60px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(2, 6, 23, 0.95)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{ fontWeight: 600, fontSize: "22px" }}>
            Sooryx
          </div>

          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
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
                gap: "6px"
              }}
            >
              BillShield
            </Link>
            <Link href="/" style={{ cursor: "pointer" }}>Home</Link>
            <Link href="/calculator" style={{ cursor: "pointer" }}>Calculate Savings</Link>
            <Link href="/how-it-works" style={{ cursor: "pointer" }}>How it Works</Link>
            <Link href="/contact" style={{ cursor: "pointer" }}>Contact Us</Link>
          </div>
        </nav>

        {children}
        
        <Footer />
        <FloatingStartButton />
      </body>
    </html>
  );
}
