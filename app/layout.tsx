import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import FloatingStartButton from "./components/FloatingStartButton";
import Footer from "./components/Footer";
import GlobalNavbar from "./components/GlobalNavbar";
import PageTitleSetter from "./components/PageTitleSetter";

export const metadata = {
  title: "Sooryx",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/sooryx-favicon.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-white pt-0 md:pt-20">
        <PageTitleSetter />
        {/* GLOBAL NAVBAR */}
        <GlobalNavbar />

        {children}
        
        <Footer />
        <FloatingStartButton />
      </body>
    </html>
  );
}
