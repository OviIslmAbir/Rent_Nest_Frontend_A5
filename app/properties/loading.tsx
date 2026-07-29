import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">

      <LoaderCircle className="w-14 h-14 text-blue-600 animate-spin" />

      <h1 className="mt-5 text-2xl font-bold">
        Loading...
      </h1>

      <p className="text-gray-500 mt-2">
        Fetching available rental properties.
      </p>

    </div>
  );
}