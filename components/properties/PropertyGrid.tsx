
import { Property } from "@/types";
import PropertyCard from "./PropertyCard";

interface Props {
  properties: Property[];
}

export default function PropertyGrid({ properties }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}