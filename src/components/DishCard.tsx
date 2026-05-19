import type { Dish } from "@/data/pizzas";

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group relative bg-card border border-gold/15 p-7 hover:border-gold/60 hover:shadow-gold transition-all duration-700 flex flex-col">
      {dish.tag && (
        <span className="self-start mb-4 text-[10px] uppercase tracking-[0.3em] text-gold border border-gold/50 px-3 py-1">
          {dish.tag}
        </span>
      )}
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h3 className="font-display text-2xl leading-tight">{dish.name}</h3>
        {dish.price !== undefined && (
          <span className="text-gold font-display text-xl whitespace-nowrap">
            €{dish.price}
          </span>
        )}
      </div>
      <div className="hairline mb-4" />
      {dish.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {dish.description}
        </p>
      )}
    </article>
  );
}
