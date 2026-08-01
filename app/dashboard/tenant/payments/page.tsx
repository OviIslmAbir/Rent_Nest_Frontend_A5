import PayButton from "@/components/tenant/PayButton";
import PaymentToast from "@/components/tenant/PaymentToast";
import { getMyPayments } from "@/services/payment";
import { getMyRentalRequests } from "@/services/rental";
import { Receipt, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TenantPaymentsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  let payments: any[] = [];
  let pendingRentals: any[] = [];
  let errorMsg: string | null = null;

  try {
    const [paymentsRes, rentalsRes] = await Promise.all([
      getMyPayments(),
      getMyRentalRequests(),
    ]);

    payments = paymentsRes?.data || [];

    const allRentals = rentalsRes?.data || rentalsRes || [];

    pendingRentals = Array.isArray(allRentals)
      ? allRentals.filter(
          (r) =>
            r.status === "APPROVED" &&
            (!r.payment || r.payment?.status !== "COMPLETED")
        )
      : [];
  } catch (error) {
    console.error("Payment page fetch error:", error);
    errorMsg = "Failed to load payment history.";
  }

  return (
    <div className="space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
      <PaymentToast searchParams={resolvedSearchParams} />

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Payments & Receipts 💳</h1>
        <p className="mt-2 text-blue-100">
          Pay rent securely using Stripe and manage transaction history.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-sm font-medium">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Clock className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold text-slate-800">Pending Payments</h2>
        </div>

        {pendingRentals.length === 0 ? (
          <p className="text-sm text-slate-400 py-4 text-center">
            No pending payments. All approved rentals are paid up! 🎉
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingRentals.map((rental: any) => (
              <div
                key={rental.id || rental._id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-slate-800 text-base">
                    {rental.property?.title || "Rental Property"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Address: {rental.property?.address || "N/A"}
                  </p>
                  <p className="text-sm font-black text-blue-600 mt-1">
                    Monthly Rent: ${rental.property?.rentPrice?.toLocaleString()}
                  </p>
                </div>

                <PayButton
                  rentalRequestId={rental.id || rental._id}
                  amount={rental.property?.rentPrice || 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <Receipt className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Payment History</h2>
        </div>

        {payments.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">
            No payment history found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 uppercase font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Paid At</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p: any) => (
                  <tr key={p.id || p._id}>
                    <td className="px-4 py-3.5 font-bold text-slate-800">
                      {p.rentalRequest?.property?.title || "Rental Payment"}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-500">
                      {p.transactionId || "N/A"}
                    </td>
                    <td className="px-4 py-3.5">
                      {p.paidAt
                        ? new Date(p.paidAt).toLocaleDateString()
                        : new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-800">
                      ${p.amount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-500">
                      {p.provider || "STRIPE"}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full text-[10px] ${
                          p.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : p.status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {p.status === "COMPLETED" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}