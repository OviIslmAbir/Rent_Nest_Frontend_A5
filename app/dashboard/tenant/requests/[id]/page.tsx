import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Home,
  MapPin,
  User,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { getSingleRentalRequest } from "@/services/rental";
import PayButton from "@/components/tenant/PayButton";


interface Props {
  params: Promise<{ id: string }>;
}

export default async function SingleRentalRequestPage({ params }: Props) {
  const { id } = await params;

  const response = await getSingleRentalRequest(id);
  const rental = response?.data || response;

  if (!rental || !rental.id) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Rental Request Not Found
        </h2>
        <Link
          href="/dashboard/tenant/requests"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} /> Back to Requests
        </Link>
      </div>
    );
  }

  const isPaid =
    rental.payment?.status === "COMPLETED" || rental.status === "ACTIVE";

  const statusColor: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    APPROVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
    ACTIVE: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">

      <Link
        href="/dashboard/tenant/requests"
        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Requests
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
              {rental.property?.title || "Property Details"}
            </h2>

            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={18} className="text-blue-600" />
              {rental.property?.address || rental.property?.city || "N/A"}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Move In Date
                </p>
                <p className="font-semibold text-slate-800 mt-1">
                  {rental.moveInDate
                    ? new Date(rental.moveInDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Duration
                </p>
                <p className="font-semibold text-slate-800 mt-1">
                  {rental.duration ? `${rental.duration} Months` : "N/A"}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Rent Price
                </p>
                <p className="font-bold text-emerald-600 text-lg mt-1">
                  ${rental.property?.rentPrice?.toLocaleString() || "0"} / month
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Landlord
                </p>
                <p className="font-semibold text-slate-800 mt-1">
                  {rental.property?.landlord?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Your Request Message
            </h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl text-sm">
              {rental.message || "No custom message provided."}
            </p>
          </div>
        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Request Status</h3>
            <span
              className={`mt-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold border ${
                statusColor[isPaid ? "ACTIVE" : rental.status] ||
                "bg-slate-100 text-slate-700"
              }`}
            >
              {isPaid ? "ACTIVE / PAID" : rental.status}
            </span>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase">
              Payment Status
            </p>
            <p className="font-semibold text-slate-700">
              {isPaid ? "COMPLETED" : rental.payment?.status || "PENDING"}
            </p>
          </div>


          {rental.status === "APPROVED" && !isPaid && (
            <div className="pt-2">
              <PayButton
                rentalRequestId={rental.id}
                amount={rental.property?.rentPrice || 0}
              />
            </div>
          )}

          {isPaid && (
            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-2 text-sm font-semibold border border-emerald-200">
              <CheckCircle2 size={18} /> Payment Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}