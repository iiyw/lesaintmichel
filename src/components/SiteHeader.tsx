import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/sobre", label: "Histoire" },
  { to: "/cardapio", label: "Menu" },
  { to: "/galerie", label: "Galerie" },
  { to: "/contato", label: "Réservations" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-gold/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="h-9 w-9 rounded-full border border-gold/60 flex items-center justify-center font-display text-gold text-lg animate-shimmer">
            S
          </span>
          <span className="font-display text-xl tracking-wide">
            Le Saint<span className="text-gold">·</span>Michel
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.28em]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground/70 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contato"
          className="hidden lg:inline-flex items-center px-6 py-3 border border-gold text-gold text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-gold-foreground transition-all duration-300"
        >
          Réserver
        </Link>

        <button
          className="lg:hidden p-2 -mr-2 text-gold"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-gold/20">
          <nav className="flex flex-col px-6 py-8 gap-5 text-sm uppercase tracking-[0.22em]">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-foreground/80"
                activeProps={{ className: "text-gold" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
