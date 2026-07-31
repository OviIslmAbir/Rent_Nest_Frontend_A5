import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Home,
  MapPin,
  User,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

import { getSingleRentalRequest } from "@/services/rental";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleRentalPage({ params }: Props) {
  const { id } = await params;

  const response = await getSingleRentalRequest(id);

  const rental = response?.data || response;

  if (!rental) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Rental Request Not Found</h2>
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    ACTIVE: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="space-y-8">

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <h1 className="text-3xl font-bold">
          Rental Request Details
        </h1>

        <p className="mt-2 text-blue-100">
          View complete information about your rental request.
        </p>
      </div>

      <Link
        href="/dashboard/tenant/requests"
        className="inline-flex items-center gap-2 text-blue-600 font-semibold"
      >
        <ArrowLeft size={18} />
        Back to Requests
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">
              {rental.property?.title}
            </h2>

            <div className="mt-3 flex items-center gap-2 text-slate-500">
              <MapPin size={18} />
              {rental.property?.address}
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-5">

              <InfoCard
                icon={<CalendarDays size={22} />}
                label="Move In"
                value={new Date(
                  rental.moveInDate
                ).toLocaleDateString()}
              />

              <InfoCard
                icon={<Clock3 size={22} />}
                label="Duration"
                value={`${rental.duration} Months`}
              />

              <InfoCard
                icon={<Home size={22} />}
                label="Monthly Rent"
                value={`$${rental.property?.rentPrice}`}
              />

              <InfoCard
                icon={<User size={22} />}
                label="Landlord"
                value={rental.property?.landlord?.name}
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">
              Your Message
            </h2>

            <p className="mt-4 text-slate-600 leading-7">
              {rental.message || "No message provided."}
            </p>
          </div>
        </div>

        <aside className="rounded-2xl border bg-white p-6 shadow-sm h-fit">

          <h3 className="text-xl font-bold">
            Request Status
          </h3>

          <span
            className={`mt-5 inline-block rounded-full px-4 py-2 font-semibold ${
              statusColor[rental.status]
            }`}
          >
            {rental.status}
          </span>

          <div className="mt-8 space-y-4">

            <div>
              <p className="text-sm text-slate-500">
                Requested At
              </p>

              <p className="font-semibold">
                {new Date(
                  rental.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Payment Status
              </p>

              <p className="font-semibold">
                {rental.payment?.status || "Not Paid"}
              </p>
            </div>

          </div>

          {rental.status === "APPROVED" && (
            <Button className="w-full mt-8">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Now
            </Button>
          )}

        </aside>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-slate-50 p-5">
      <div className="text-blue-600">{icon}</div>

      <p className="mt-3 text-sm text-slate-500">
        {label}
      </p>

      <h3 className="mt-1 font-semibold">
        {value}
      </h3>
    </div>
  );
}