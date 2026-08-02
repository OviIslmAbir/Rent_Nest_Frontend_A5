import PropertyFilter from "@/components/properties/PropertyFilter";
import PropertyGrid from "@/components/properties/PropertyGrid";
import { getProperties } from "@/services/property";
import { Building2} from "lucide-react";

interface PropertiesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;

  const location =
    typeof params.location === "string" ? params.location : undefined;
  const category =
    typeof params.category === "string" ? params.category : undefined;

  const properties = await getProperties({ location, category });

  return (
    <main className="min-h-screen  text-white selection:bg-cyan-500 selection:text-black">
      <section className="relative py-20 bg-[#050716] border-b border-slate-800/60 overflow-hidden">
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[350px] h-[350px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#0c1024] border border-cyan-500/30 px-4 py-1.5 rounded-full mb-6 shadow-sm shadow-cyan-500/10">
            <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              RentNest Listings
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                Explore Available{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Properties
                </span>
              </h1>
              <p className="text-slate-400 mt-3 text-base sm:text-lg max-w-xl font-medium">
                Find your perfect rental home with transparent pricing and verified listings.
              </p>
            </div>

            <div className="flex items-center gap-2.5 bg-[#0c1024]/80 border border-slate-800 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-slate-200">
              <Building2 size={18} className="text-cyan-400" />
              <span>{properties?.length || 0} Homes Available</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          <PropertyFilter />

          <div className="lg:col-span-3">
            <PropertyGrid properties={properties} />
          </div>
        </div>
      </div>
    </main>
  );
}