"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Star,
} from "lucide-react";

import {
  createReview,
  getMyPaidProperties,
} from "@/services/review";

interface PropertyOption {
  id: string;
  title: string;
}

export default function ReviewPage() {
  const [properties, setProperties] = useState<PropertyOption[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadProperties();
  }, []);

const loadProperties = async () => {
  setFetching(true);
  setError("");

  try {
    const res = await getMyPaidProperties();

    if (!res.success) {
      throw new Error(res.message);
    }

    const properties = (res.data as PropertyOption[]) ?? [];

    setProperties(properties);

    if (properties.length > 0) {
      setSelectedPropertyId(properties[0].id);
    }
  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : "Failed to load properties.");
  } finally {
    setFetching(false);
  }
};
  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setComment("");

    if (properties.length > 0) {
      setSelectedPropertyId(properties[0].id);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!selectedPropertyId) {
      setError("Please select a property.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write your review.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        propertyId: selectedPropertyId,
        rating,
        comment: comment.trim(),
      };

      console.log("Submitting Payload:", payload);

      const res = await createReview(payload);

      console.log("Review Response:", res);

      if (!res.success) {
        throw new Error(res.message || "Failed to submit review.");
      }

      setSuccess(true);
      resetForm();
    } catch (err: unknown) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={34} />
      </div>
    );
  }

  return (
    <div className="flex min-h-[75vh] items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-slate-800">Write a Review</h2>

        <p className="mt-2 text-sm text-slate-500">
          Share your experience with the property.
        </p>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10">
            <CheckCircle2 size={60} className="mb-4 text-emerald-500" />

            <h3 className="text-xl font-bold text-slate-800">
              Review Submitted
            </h3>

            <p className="mt-2 text-center text-slate-500">
              Thank you for your valuable feedback.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Write Another Review
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Select Property
              </label>

              {properties.length === 0 ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                  You don't have any completed payments yet.
                </div>
              ) : (
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                >
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition hover:scale-110"
                  >
                    <Star
                      size={34}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Comment
              </label>

              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your experience..."
                className="w-full resize-none rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading || properties.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}