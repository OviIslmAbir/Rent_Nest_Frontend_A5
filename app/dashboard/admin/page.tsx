"use client";

import { useEffect, useState } from "react";
import {
  getAllUsers,
  getAllProperties,
  UserItem,
  PropertyItem,
} from "@/services/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Loader2, Activity } from "lucide-react";

export default function DynamicAdminDashboard() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch live data (Users & Properties only)
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [usersData, propertiesData] = await Promise.all([
          getAllUsers(),
          getAllProperties(),
        ]);

        setUsers(usersData);
        setProperties(propertiesData);
      } catch (error) {
        console.error("Error loading admin dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-24 gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">
          Loading platform metrics...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time dynamic platform stats for RentNest moderation.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit px-3 py-1 bg-emerald-50 text-emerald-700 border-emerald-200 flex gap-1.5 items-center"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Platform Data
        </Badge>
      </div>

      {/* 2 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Users */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered Tenants & Landlords
            </p>
          </CardContent>
        </Card>

        {/* Total Properties */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Properties
            </CardTitle>
            <div className="h-9 w-9 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active & Listed Rentals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Content Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Dynamic User Summary / System Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Latest Registered Users
            </CardTitle>
            <CardDescription>Dynamic user registration feeds.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-2">
              {users.slice(0, 5).map((u) => (
                <div key={u.id} className="ml-4 relative">
                  <span className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white" />
                  <p className="text-xs font-semibold">{u.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                  <Badge variant="outline" className="text-[10px] mt-1 uppercase">
                    {u.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}