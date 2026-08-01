"use client";

import React, { useEffect, useState } from "react";
import { getAllProperties, PropertyItem as BasePropertyItem } from "@/services/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Search,
  User,
  Loader2,
  Home,
} from "lucide-react";

interface ExtendedPropertyItem extends BasePropertyItem {
  landlord?: {
    name?: string;
    email?: string;
  };
}

const AdminPropertyPage = () => {
  const [properties, setProperties] = useState<ExtendedPropertyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");


  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await getAllProperties();
        setProperties((data as ExtendedPropertyItem[]) || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  const filteredProperties = properties.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = item.title?.toLowerCase().includes(searchLower);
    const landlordMatch =
      item.landlord?.name?.toLowerCase().includes(searchLower) ||
      item.landlord?.email?.toLowerCase().includes(searchLower);

    return titleMatch || landlordMatch;
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-24 gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">
          Loading properties...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Properties</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and view all listed properties across all landlords.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 flex gap-1.5 items-center font-mono"
        >
          <Home className="h-4 w-4 text-blue-600" />
          {properties.length} Total Properties
        </Badge>
      </div>


      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Property Directory
              </CardTitle>
              <CardDescription>
                Search by property title or landlord details.
              </CardDescription>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties or landlords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground space-y-2">
              <Building2 className="h-10 w-10 mx-auto opacity-40" />
              <p className="text-sm">No properties found matching your search.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Landlord</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id} className="hover:bg-slate-50/50">
                      {/* Property Info */}
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Building2 className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {property.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ID: {property.id?.slice(-6) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </TableCell>


                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-slate-400" />
                          <div>
                            <p className="font-medium">
                              {property.landlord?.name || "Unknown Landlord"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {property.landlord?.email || "No Email"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPropertyPage;