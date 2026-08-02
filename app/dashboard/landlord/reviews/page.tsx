"use client";

import { useEffect, useState } from "react";
import { Star, Loader2, Home, User, Calendar, MessageSquare, AlertCircle } from "lucide-react";
import { getLandlordReviews } from "@/services/review";
import { Review } from "@/types";



export default function LandlordReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

const fetchReviews = async () => {
  try {
    const result = await getLandlordReviews();

    if (!mounted) return;

    if (!result.success) {
      setErrorMessage(result.message);
      setReviews([]);
      return;
    }

    setReviews(result.data);
  } catch (error) {
    console.error(error);

    if (mounted) {
      setErrorMessage("Failed to load reviews.");
    }
  } finally {
    if (mounted) {
      setLoading(false);
    }
  }
};

    fetchReviews();

    return () => {
      mounted = false;
    };
  }, []);


  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
        <p className="text-slate-500 font-medium text-sm">Loading reviews...</p>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">

      <div>
        <h1 className="text-2xl font-black text-slate-800">Tenant Reviews</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Feedback and ratings submitted by tenants for your properties.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <p className="text-xs md:text-sm font-semibold">{errorMessage}</p>
        </div>
      )}

      {!errorMessage && totalReviews > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-amber-50 text-amber-500 p-3.5 rounded-2xl border border-amber-100">
              <Star className="h-8 w-8 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-800">
                  {averageRating}
                </span>
                <span className="text-sm text-slate-400 font-semibold">
                  / 5.0
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        </div>
      )}

      {!errorMessage && reviews.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-sm">
          <MessageSquare className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No reviews received yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review, idx) => {
            const reviewId = review.id || review._id || idx;
            const commentText = review.comment || review.message || "";
            const tenantName =
              review.tenant?.name ||
              review.tenantName ||
              review.tenant?.email ||
              "Tenant";
            const propertyTitle =
              review.property?.title || review.propertyTitle || "Property";
            const date = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString()
              : null;

            return (
              <div
                key={reviewId}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 transition-all hover:border-slate-200"
              >

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-800 text-base">
                      {propertyTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= (review.rating || 0)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-1">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1 text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    <User className="h-3.5 w-3.5 text-blue-600" />
                    {tenantName}
                  </span>

                  {date && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {date}
                    </span>
                  )}
                </div>


                {commentText && (
                  <p className="text-sm bg-slate-50/80 p-3.5 rounded-xl text-slate-700 border border-slate-100 leading-relaxed italic">
                    &quot;{commentText}&quot;
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}