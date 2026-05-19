import type { Pizza } from "@/data/pizzas";

export function PizzaCard({ pizza }: { pizza: Pizza }) {
  return (
    <article className="group relative bg-card border border-border overflow-hidden hover:border-ember/50 transition-all duration-500">
      <div className="aspect-square overflow-hidden bg-background">
        <img
          src={pizza.image}
          alt={pizza.name}
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="font-display text-2xl">{pizza.name}</h3>
          <span className="text-ember font-display text-xl whitespace-nowrap">
            R$ {pizza.price}
          </span>
        </div>
        {pizza.tag && (
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-ember mb-3">
            — {pizza.tag}
          </span>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {pizza.description}
        </p>
      </div>
    </article>
  );
}
