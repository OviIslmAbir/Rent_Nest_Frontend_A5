"use client";


export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 
        </p>
      </div>

    </header>
  );
}