import DashboardHeader from "@/components/dashboard/dashboardHeader";
import DashboardSidebar from "@/components/dashboard/dashboardSidebar";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">

        <DashboardSidebar />

   
        <div className="flex-1 min-h-screen lg:ml-72">
          <DashboardHeader  />

          <main className="p-6" >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}