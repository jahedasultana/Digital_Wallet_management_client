/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Eye,
  Users,
  UserCheck,
  Clock,
  UserX,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useGetAdminStatsQuery } from "@/redux/features/stats/statsApi";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useBlockUserWalletMutation,
  useUnblockUserWalletMutation,
  useUpdateUserByIdMutation,
} from "@/redux/features/user/userApi";

export function AdminAgents() {
  const { data: AdminStats } = useGetAdminStatsQuery({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch users from API with role=agent
  const {
    data: AllUsers,
    isLoading,
    refetch,
  } = useGetAllUsersQuery({
    page,
    limit,
    role: "AGENT",
  });

  const users = AllUsers?.data || [];
  const meta = AllUsers?.meta;

  const [deleteUser] = useDeleteUserMutation();
  const [blockUser] = useBlockUserWalletMutation();
  const [unblockUser] = useUnblockUserWalletMutation();
  const [updateUser] = useUpdateUserByIdMutation();

  const [confirmation, setConfirmation] = useState<{
    open: boolean;
    action: "delete" | "block" | "unblock" | "verify" | "unverify" | null;
    user?: any;
  }>({ open: false, action: null });

  const [detailModalUser, setDetailModalUser] = useState<any>(null);

  const openConfirmation = (action: typeof confirmation.action, user: any) => {
    setConfirmation({ open: true, action, user });
  };

  const closeConfirmation = () =>
    setConfirmation({ open: false, action: null });

  const handleConfirm = async () => {
    if (!confirmation.user) return;
    const userId = confirmation.user._id;

    try {
      switch (confirmation.action) {
        case "delete":
          await deleteUser(userId).unwrap();
          toast.success("User deleted successfully");
          break;
        case "block":
          await blockUser(userId).unwrap();
          toast.success("User wallet blocked");
          break;
        case "unblock":
          await unblockUser(userId).unwrap();
          toast.success("User wallet unblocked");
          break;
        case "verify":
          await updateUser({ id: userId, verified: "VERIFIED" }).unwrap();
          toast.success("User verified successfully");
          break;
        case "unverify":
          await updateUser({ id: userId, verified: "UNVERIFIED" }).unwrap();
          toast.success("User unverified");
          break;
      }
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Action failed");
    }
    closeConfirmation();
  };

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return <Badge variant='default'>Active</Badge>;
      case "PENDING":
        return <Badge variant='secondary'>Pending</Badge>;
      case "SUSPENDED":
        return <Badge variant='outline'>Suspended</Badge>;
      case "BLOCKED":
        return <Badge variant='destructive'>Blocked</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const getVerifiedBadge = (verified: string) => {
    switch (verified.toUpperCase()) {
      case "VERIFIED":
        return <Badge variant='default'>Verified</Badge>;
      case "UNVERIFIED":
        return <Badge variant='outline'>Unverified</Badge>;
      default:
        return <Badge variant='outline'>{verified}</Badge>;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Manage Agents</h1>
        <p className='text-muted-foreground'>
          View and manage all agent accounts
        </p>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='pb-2 flex items-center justify-between'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <Users className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {AdminStats?.data?.totalUsers ?? 0}
            </div>
            <p className='text-xs text-muted-foreground'>Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2 flex items-center justify-between'>
            <CardTitle className='text-sm font-medium'>Active Users</CardTitle>
            <UserCheck className='h-5 w-5 text-green-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              {AdminStats?.data?.activeUsers ?? 0}
            </div>
            <p className='text-xs text-muted-foreground'>Verified and active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2 flex items-center justify-between'>
            <CardTitle className='text-sm font-medium'>
              Pending Approval
            </CardTitle>
            <Clock className='h-5 w-5 text-yellow-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-yellow-600'>
              {AdminStats?.data?.pendingApproval ?? 0}
            </div>
            <p className='text-xs text-muted-foreground'>
              Awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2 flex items-center justify-between'>
            <CardTitle className='text-sm font-medium'>
              Suspended/Blocked
            </CardTitle>
            <UserX className='h-5 w-5 text-red-600' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              {AdminStats?.data?.suspendedUsers ?? 0}
            </div>
            <p className='text-xs text-muted-foreground'>Restricted accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Search, filter, and manage agent accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search + Filter */}
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search users by name, email, or phone...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='suspended'>Suspended</SelectItem>
                <SelectItem value='blocked'>Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center py-6'>
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : users.length > 0 ? (
                  users.map((user: any) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className='flex items-center space-x-3'>
                          <Avatar className='h-8 w-8'>
                            {user.profile_picture ? (
                              <AvatarImage src={user.profile_picture} />
                            ) : (
                              <AvatarFallback>
                                {user.name?.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <p className='font-medium'>{user.name}</p>
                            <p className='text-sm text-muted-foreground'>
                              {user._id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className='text-sm'>{user.email}</p>
                          <p className='text-sm text-muted-foreground'>
                            {user.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{getVerifiedBadge(user.verified)}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => setDetailModalUser(user)}
                            >
                              <Eye className='mr-2 h-4 w-4' /> View Details
                            </DropdownMenuItem>

                            {user.status.toUpperCase() === "BLOCKED" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  openConfirmation("unblock", user)
                                }
                              >
                                <CheckCircle className='mr-2 h-4 w-4 text-green-600' />{" "}
                                Unblock Wallet
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => openConfirmation("block", user)}
                              >
                                <XCircle className='mr-2 h-4 w-4 text-red-600' />{" "}
                                Block Wallet
                              </DropdownMenuItem>
                            )}

                            {user.verified.toUpperCase() === "VERIFIED" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  openConfirmation("unverify", user)
                                }
                              >
                                <XCircle className='mr-2 h-4 w-4 text-red-600' />{" "}
                                Mark Unverified
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => openConfirmation("verify", user)}
                              >
                                <CheckCircle className='mr-2 h-4 w-4 text-green-600' />{" "}
                                Mark Verified
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuItem
                              onClick={() => openConfirmation("delete", user)}
                            >
                              <Trash2 className='mr-2 h-4 w-4 text-red-600' />{" "}
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center py-6'>
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {meta && (
            <div className='flex justify-between items-center mt-4'>
              <Button
                variant='outline'
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className='text-sm text-muted-foreground'>
                Page {meta.page} of {meta.totalPage}
              </span>
              <Button
                variant='outline'
                disabled={page >= meta.totalPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmation.open && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 sm:w-96 shadow-lg'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className='text-lg font-semibold mb-4'>
                {confirmation.action === "delete" && "Delete User"}
                {confirmation.action === "block" && "Block Wallet"}
                {confirmation.action === "unblock" && "Unblock Wallet"}
                {confirmation.action === "verify" && "Mark Verified"}
                {confirmation.action === "unverify" && "Mark Unverified"}
              </h2>
              <p className='mb-6'>
                Are you sure you want to{" "}
                {confirmation.action?.replace(/([A-Z])/g, " $1").toLowerCase()}{" "}
                <strong>{confirmation.user?.name}</strong>?
              </p>
              <div className='flex justify-end gap-4'>
                <Button variant='outline' onClick={closeConfirmation}>
                  Cancel
                </Button>
                <Button variant='destructive' onClick={handleConfirm}>
                  Confirm
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Details Modal */}
      <AnimatePresence>
        {detailModalUser && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 sm:w-96 shadow-lg'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className='text-lg font-semibold mb-4'>User Details</h2>
              <div className='space-y-2'>
                <p>
                  <strong>Name:</strong> {detailModalUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {detailModalUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {detailModalUser.phone}
                </p>
                <p>
                  <strong>Status:</strong> {detailModalUser.status}
                </p>
                <p>
                  <strong>Verified:</strong> {detailModalUser.verified}
                </p>
                <p>
                  <strong>Joined:</strong>{" "}
                  {new Date(detailModalUser.createdAt).toLocaleDateString()}
                </p>
                {detailModalUser.profile_picture && (
                  <img
                    src={detailModalUser.profile_picture}
                    className='w-24 h-24 rounded-full mt-2'
                    alt='Profile'
                  />
                )}
              </div>
              <div className='flex justify-end mt-4'>
                <Button
                  variant='outline'
                  onClick={() => setDetailModalUser(null)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
