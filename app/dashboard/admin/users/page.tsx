"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserByAdmin, UserItem } from "@/services/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, UserCheck, Users, Ban } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);


const handleStatusToggle = async (user: UserItem) => {
  setActionLoadingId(user.id);

  const isCurrentlyBlocked = user.isBlocked ?? (user.status === "BLOCKED");
  const nextBlockedState = !isCurrentlyBlocked;


  const payload = {
    isBlocked: nextBlockedState,

  };

  try {
    const res = await updateUserByAdmin(user.id, payload);

    if (res?.success !== false) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, isBlocked: nextBlockedState, status: nextBlockedState ? "BLOCKED" : "ACTIVE" }
            : u
        )
      );
    } else {
      alert(res?.message || "Failed to update user status.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Something went wrong while updating status.");
  } finally {
    setActionLoadingId(null);
  }
};
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage user roles and account statuses across RentNest.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Registered Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No users found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const isBlocked =
                    user.status === "BLOCKED" || user.isBlocked === true;

                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.name || "N/A"}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {isBlocked ? (
                          <Badge variant="destructive" className="flex w-fit items-center gap-1">
                            <Ban className="h-3 w-3" /> Blocked
                          </Badge>
                        ) : (
                          <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-700 flex w-fit items-center gap-1">
                            <UserCheck className="h-3 w-3" /> Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={isBlocked ? "default" : "destructive"}
                          disabled={actionLoadingId === user.id}
                          onClick={() => handleStatusToggle(user)}
                          className="rounded-lg text-xs"
                        >
                          {actionLoadingId === user.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : isBlocked ? (
                            "Unblock"
                          ) : (
                            "Block"
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}