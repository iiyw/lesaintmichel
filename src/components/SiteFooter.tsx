import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-gold/20 mt-32 bg-background">
      <div className="hairline" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full border border-gold/60 flex items-center justify-center font-display text-gold text-lg">
              S
            </span>
            <span className="font-display text-xl tracking-wide">
              Le Saint<span className="text-gold">·</span>Michel
            </span>
          </Link>
          <p className="mt-6 text-sm text-muted-foreground max-w-md leading-relaxed">
            Une cuisine gastronomique française et belge, au cœur historique de
            La Roche-en-Ardenne. Chaque plat est une invitation au voyage des sens.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="p-2.5 border border-gold/30 text-gold/80 hover:border-gold hover:text-gold transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="p-2.5 border border-gold/30 text-gold/80 hover:border-gold hover:text-gold transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="text-sm">
          <h4 className="font-display text-base mb-5 text-gold">Nous trouver</h4>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" /><span>Rue de l'Église 17<br />6980 La Roche-en-Ardenne<br />Belgique</span></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" /><span>+32 471 32 44 02</span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" /><span>contact@lesaintmichel.be</span></li>
          </ul>
        </div>

        <div className="text-sm">
          <h4 className="font-display text-base mb-5 text-gold">Horaires</h4>
          <p className="text-muted-foreground leading-relaxed">
            Mardi — Samedi<br />
            Déjeuner · 12h00 — 14h00<br />
            Dîner · 19h00 — 21h30<br />
            <span className="text-foreground/40 mt-2 inline-block">Dimanche · sur réservation</span><br />
            <span className="text-foreground/40">Lundi · fermé</span>
          </p>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 text-xs text-muted-foreground flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Le Saint-Michel · La Roche-en-Ardenne</span>
          <span className="uppercase tracking-[0.28em] text-gold/60">Gastronomie · Belgique</span>
        </div>
      </div>
    </footer>
  );
}
