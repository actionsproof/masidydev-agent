import { SERVICE_CATEGORIES, getServicesByCategory } from "@/lib/services-catalog";
import { ConnectionCard } from "./connection-card";

interface ConnectionsGridProps {
  readonly connectedServiceIds: string[];
}

export function ConnectionsGrid({ connectedServiceIds }: ConnectionsGridProps) {
  const byCategory = getServicesByCategory();
  const connectedSet = new Set(connectedServiceIds);

  return (
    <div className="space-y-10">
      {SERVICE_CATEGORIES.map((category) => {
        const services = byCategory[category];
        if (!services || services.length === 0) return null;

        return (
          <section key={category} aria-labelledby={`category-${category}`}>
            <h2
              className="mb-4 font-semibold text-base text-foreground"
              id={`category-${category}`}
            >
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((service) => (
                <ConnectionCard
                  connected={connectedSet.has(service.id)}
                  key={service.id}
                  service={service}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
