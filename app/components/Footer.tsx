import Link from "next/link";
import { Sun, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[inset_0_24px_80px_rgba(15,23,42,0.45)]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 shadow-[0_10px_30px_rgba(251,191,36,0.18)]">
                <Sun size={20} className="text-slate-950" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-slate-100">Sooryx</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Building the future of distributed solar energy across India with premium reliability, modern technology, and thoughtful service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-slate-400 transition hover:text-amber-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-sm text-slate-400 transition hover:text-amber-300">
                  Solar Calculator
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-slate-400 transition hover:text-amber-300">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/billshield" className="text-sm text-slate-400 transition hover:text-amber-300">
                  BillShield
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-slate-400 transition hover:text-amber-300">
                  Residential Solar
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition hover:text-amber-300">
                  Commercial Solar
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition hover:text-amber-300">
                  EPC Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 transition hover:text-amber-300">
                  Financing Options
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
                <div className="text-sm text-slate-600">
                  <div>+91-9532666388</div>
                  <div>+91-9916515235</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
                <a href="mailto:contact@sooryx.com" className="text-sm text-slate-400 transition hover:text-amber-300">
                  contact@sooryx.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
                <span className="text-sm text-slate-600">
                  India
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-amber-300 hover:bg-amber-50/10 hover:text-amber-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-amber-300 hover:bg-amber-50/10 hover:text-amber-300"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="mailto:contact@sooryx.com"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-amber-300 hover:bg-amber-50/10 hover:text-amber-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200/70 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © 2015 Sooryanarayan Technology LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
