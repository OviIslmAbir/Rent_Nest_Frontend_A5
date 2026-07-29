import { notFound } from "next/navigation";
import { Bath, BedDouble, Building2, MapPin, User } from "lucide-react";

import { getSingleProperty } from "@/services/property";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { id } = await params;

  const property = await getSingleProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Property Image */}
        <div className="overflow-hidden rounded-3xl shadow-lg">
          <img
            src={
                property.images?.[0]?.includes("example.com")
                ? "https://placehold.co/600x400?text=RentNest"
                : property.images[0]
            }
            alt={property.title}
            className="w-full h-[500px] object-cover rounded-3xl"
            />
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                {property.category?.name}
              </span>

              <h1 className="text-4xl font-bold mt-4">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 mt-3">
                <MapPin size={18} />
                <span>
                  {property.address}, {property.area}, {property.city}
                </span>
              </div>
            </div>

            {/* Property Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="bg-white rounded-xl shadow p-5 text-center">
                <BedDouble className="mx-auto text-blue-600" />
                <p className="mt-2 font-bold">{property.bedrooms}</p>
                <span className="text-sm text-gray-500">Bedrooms</span>
              </div>

              <div className="bg-white rounded-xl shadow p-5 text-center">
                <Bath className="mx-auto text-blue-600" />
                <p className="mt-2 font-bold">{property.bathrooms}</p>
                <span className="text-sm text-gray-500">Bathrooms</span>
              </div>

              <div className="bg-white rounded-xl shadow p-5 text-center">
                <Building2 className="mx-auto text-blue-600" />
                <p className="mt-2 font-bold">
                  {property.category?.name}
                </p>
                <span className="text-sm text-gray-500">Category</span>
              </div>

              <div className="bg-white rounded-xl shadow p-5 text-center">
                <User className="mx-auto text-blue-600" />
                <p className="mt-2 font-bold capitalize">
                  {property.status}
                </p>
                <span className="text-sm text-gray-500">Status</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold mb-4">
                Description
              </h2>

              <p className="text-gray-600 leading-8">
                {property.description}
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-4xl font-bold text-blue-600">
              $ {property.rentPrice}
            </h2>

            <p className="text-gray-500 mb-6">
              Per Month
            </p>

            <hr />

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="font-semibold text-gray-700">
                  Landlord
                </h4>

                <p className="mt-1">
                  {property.landlord?.name}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">
                  Email
                </h4>

                <p className="mt-1 break-all">
                  {property.landlord?.email}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700">
                  Status
                </h4>

                <span className="inline-block mt-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {property.status}
                </span>
              </div>
            </div>

            <Button className="w-full mt-8">
              Request Rental
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
}