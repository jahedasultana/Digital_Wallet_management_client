/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  MoreHorizontal,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  User,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetAdminWalletStatsQuery,
  useGetAllWalletsQuery,
  useUpdateWalletStatusMutation,
} from "@/redux/features/wallet/walletApi";

// Types
interface User {
  _id: string;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
}

interface WalletData {
  _id: string;
  balance: number;
  createdAt: string;
  status: string;
  updatedAt: string;
  user: User | string;
  __v: number;
  transactionCount?: number;
}

interface TransformedWallet {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerType: "USER" | "AGENT" | "ADMIN";
  balance: number;
  status: "ACTIVE" | "FROZEN" | "BLOCKED";
  lastTransaction: string;
  transactionCount: number;
  createdDate: string;
  rawData: WalletData;
}

interface AdminWalletStats {
  totalWallets: number;
  totalBalance: number;
  activeWallets: number;
  frozenWallets: number;
  blockedWallets: number;
}

type FilterStatus = "all" | "ACTIVE" | "FROZEN" | "BLOCKED";
type FilterType = "all" | "USER" | "AGENT";

export function AdminWallets() {
  const { data: AdminWalletStats, isLoading: statsLoading } =
    useGetAdminWalletStatsQuery({});
  const {
    data: AdminWalletsData,
    isLoading: walletsLoading,
    refetch: refetchWallets,
  } = useGetAllWalletsQuery({});

  const [updateWalletStatus, { isLoading: isUpdatingStatus }] =
    useUpdateWalletStatusMutation();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [selectedWallet, setSelectedWallet] =
    useState<TransformedWallet | null>(null);
  console.log(selectedWallet);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  // Transform API data to match component structure
  const wallets = useMemo<TransformedWallet[]>(() => {
    if (!AdminWalletsData?.data) return [];

    return AdminWalletsData.data.map(
      (wallet: WalletData): TransformedWallet => {
        const user =
          typeof wallet.user === "object"
            ? wallet.user
            : { _id: wallet.user as string };

        return {
          id: wallet._id,
          ownerId: user._id,
          ownerName:
            user.name || user.username || `User ${user._id?.slice(-4)}`,
          ownerType: user.role === "AGENT" ? "AGENT" : "USER",
          balance: wallet.balance || 0,
          status:
            (wallet.status as "ACTIVE" | "FROZEN" | "BLOCKED") || "ACTIVE",
          lastTransaction: new Date(wallet.updatedAt).toLocaleString(),
          transactionCount: wallet.transactionCount || 0,
          createdDate: new Date(wallet.createdAt).toLocaleDateString(),
          rawData: wallet,
        };
      }
    );
  }, [AdminWalletsData]);

  // Filter wallets based on search and filters
  const filteredWallets = useMemo<TransformedWallet[]>(() => {
    return wallets.filter((wallet) => {
      const matchesSearch =
        searchTerm === "" ||
        wallet.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.ownerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || wallet.status === filterStatus;
      const matchesType =
        filterType === "all" || wallet.ownerType === filterType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [wallets, searchTerm, filterStatus, filterType]);

  // Pagination logic
  const totalPages = Math.ceil(filteredWallets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedWallets = filteredWallets.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterType]);

  // Calculate summary stats from actual data
  const summaryStats = useMemo<AdminWalletStats>(() => {
    const totalBalance = wallets.reduce(
      (sum, wallet) => sum + wallet.balance,
      0
    );
    const activeWallets = wallets.filter((w) => w.status === "ACTIVE").length;
    const frozenWallets = wallets.filter((w) => w.status === "FROZEN").length;
    const blockedWallets = wallets.filter((w) => w.status === "BLOCKED").length;

    return {
      totalWallets: wallets.length,
      totalBalance,
      activeWallets,
      frozenWallets,
      blockedWallets,
    };
  }, [wallets]);

  const getStatusBadge = (status: string) => {
    console.log(".......", status);
    switch (status) {
      case "ACTIVE":
        return (
          <Badge variant='default' className='bg-green-100 text-green-800'>
            Active
          </Badge>
        );
      case "FROZEN":
        return <Badge variant='secondary'>Frozen</Badge>;
      case "BLOCKED":
        return <Badge variant='destructive'>Blocked</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const getOwnerTypeBadge = (type: string) => {
    return type === "AGENT" ? (
      <Badge variant='outline' className='bg-blue-50 text-blue-700'>
        Agent
      </Badge>
    ) : (
      <Badge variant='outline'>User</Badge>
    );
  };

  const handleUpdateWalletStatus = async (
    walletId: string,
    newStatus: "ACTIVE" | "FROZEN" | "BLOCKED"
  ) => {
    try {
      await updateWalletStatus({
        walletId,
        status: newStatus,
      }).unwrap();

      const statusText = newStatus.toLowerCase();
      toast.success(
        `Wallet ${
          statusText === "blocked"
            ? "blocked"
            : statusText === "frozen"
            ? "frozen"
            : "activated"
        } successfully`
      );
      refetchWallets();
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to update wallet status`);
      console.error("Update wallet status error:", error);
    }
  };

  const handleWalletStatusToggle = (walletId: string, newStatus: string) => {
    console.log(newStatus, "261");
    const wallet = wallets.find((w) => w.id === walletId);
    if (!wallet) return;

    handleUpdateWalletStatus(
      walletId,
      newStatus as "ACTIVE" | "FROZEN" | "BLOCKED"
    );
  };

  const getStatusToggle = (wallet: TransformedWallet) => {
    if (wallet.status === "BLOCKED") {
      return (
        <Button
          variant='outline'
          size='sm'
          onClick={() => handleWalletStatusToggle(wallet.id, "ACTIVE")}
          className='text-green-600 hover:text-green-700'
          disabled={isUpdatingStatus}
        >
          <Unlock className='mr-1 h-3 w-3' />
          {isUpdatingStatus ? "Updating..." : "Unblock"}
        </Button>
      );
    }

    return (
      <div className='flex items-center space-x-2'>
        <Switch
          checked={wallet.status === "ACTIVE"}
          onCheckedChange={(checked) =>
            handleWalletStatusToggle(wallet.id, checked ? "ACTIVE" : "FROZEN")
          }
          disabled={isUpdatingStatus}
        />
        <span className='text-xs text-muted-foreground'>
          {wallet.status === "ACTIVE" ? "Active" : "Frozen"}
        </span>
      </div>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleViewDetails = (wallet: TransformedWallet) => {
    setSelectedWallet(wallet);
    setIsDetailsModalOpen(true);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
  };

  if (statsLoading || walletsLoading) {
    return (
      <div className='space-y-6'>
        <div className='text-center py-8'>
          <p className='text-muted-foreground'>Loading wallet data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Manage Wallets</h1>
        <p className='text-muted-foreground'>
          Monitor and manage all user and agent wallets
        </p>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-4'>
        {/* Total Wallets */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Total Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {AdminWalletStats?.data?.totalWallets ??
                summaryStats.totalWallets}
            </div>
            <p className='text-xs text-muted-foreground'>All wallet accounts</p>
          </CardContent>
        </Card>

        {/* Total Balance */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              $
              {(
                AdminWalletStats?.data?.totalBalance ??
                summaryStats.totalBalance
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className='text-xs text-muted-foreground'>Combined balance</p>
          </CardContent>
        </Card>

        {/* Active Wallets */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Wallets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              {AdminWalletStats?.data?.activeWallets ??
                summaryStats.activeWallets}
            </div>
            <p className='text-xs text-muted-foreground'>Fully operational</p>
          </CardContent>
        </Card>

        {/* Restricted Wallets */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium'>Restricted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              {AdminWalletStats?.data
                ? (AdminWalletStats.data.blockedWallets ?? 0) +
                  (AdminWalletStats.data.frozenWallets ?? 0)
                : summaryStats.frozenWallets + summaryStats.blockedWallets}
            </div>
            <p className='text-xs text-muted-foreground'>Frozen + Blocked</p>
          </CardContent>
        </Card>
      </div>

      {/* Wallets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Management</CardTitle>
          <CardDescription>
            Search, filter, and manage wallet statuses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search by owner name, ID, or wallet ID...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Select
              value={filterStatus}
              onValueChange={(value: FilterStatus) => setFilterStatus(value)}
            >
              <SelectTrigger className='w-full sm:w-[140px]'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='ACTIVE'>Active</SelectItem>
                <SelectItem value='FROZEN'>Frozen</SelectItem>
                <SelectItem value='BLOCKED'>Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterType}
              onValueChange={(value: FilterType) => setFilterType(value)}
            >
              <SelectTrigger className='w-full sm:w-[140px]'>
                <SelectValue placeholder='Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Types</SelectItem>
                <SelectItem value='USER'>Users</SelectItem>
                <SelectItem value='AGENT'>Agents</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className='w-full sm:w-[100px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='5'>5</SelectItem>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
                <SelectItem value='50'>50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet ID</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Control</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedWallets.map((wallet) => (
                  <TableRow key={wallet.id}>
                    <TableCell>
                      <span className='font-mono text-sm'>
                        {wallet.id.slice(-8)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className='font-medium'>{wallet.ownerName}</p>
                        <p className='text-sm text-muted-foreground'>
                          {wallet.ownerId.slice(-8)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getOwnerTypeBadge(wallet.ownerType)}</TableCell>
                    <TableCell>
                      <span className='font-medium'>
                        $
                        {wallet.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(wallet.status)}</TableCell>
                    <TableCell>
                      <span className='text-sm text-muted-foreground'>
                        {wallet.createdDate}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className='text-sm text-muted-foreground'>
                        {wallet.lastTransaction}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusToggle(wallet)}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(wallet)}
                          >
                            <Eye className='mr-2 h-4 w-4' />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertTriangle className='mr-2 h-4 w-4' />
                            Transaction History
                          </DropdownMenuItem>
                          {wallet.status !== "BLOCKED" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleWalletStatusToggle(wallet.id, "BLOCKED")
                              }
                              className='text-red-600'
                              disabled={isUpdatingStatus}
                            >
                              <Lock className='mr-2 h-4 w-4' />
                              {isUpdatingStatus
                                ? "Updating..."
                                : "Block Wallet"}
                            </DropdownMenuItem>
                          )}
                          {wallet.status === "BLOCKED" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleWalletStatusToggle(wallet.id, "ACTIVE")
                              }
                              className='text-green-600'
                              disabled={isUpdatingStatus}
                            >
                              <Unlock className='mr-2 h-4 w-4' />
                              {isUpdatingStatus
                                ? "Updating..."
                                : "Unblock Wallet"}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {filteredWallets.length > 0 && (
            <div className='flex items-center justify-between mt-4'>
              <div className='text-sm text-muted-foreground'>
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredWallets.length)} of{" "}
                {filteredWallets.length} wallets
              </div>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className='h-4 w-4' />
                  Previous
                </Button>

                <div className='flex items-center space-x-1'>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size='sm'
                        onClick={() => handlePageChange(pageNum)}
                        className='w-8 h-8 p-0'
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}

          {filteredWallets.length === 0 && !walletsLoading && (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                {searchTerm || filterStatus !== "all" || filterType !== "all"
                  ? "No wallets found matching your criteria."
                  : "No wallets available."}
              </p>
              {(searchTerm ||
                filterStatus !== "all" ||
                filterType !== "all") && (
                <Button
                  variant='outline'
                  size='sm'
                  className='mt-2'
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterType("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wallet Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Wallet Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected wallet
            </DialogDescription>
          </DialogHeader>

          {selectedWallet && (
            <div className='space-y-6'>
              {/* Basic Info */}
              <div className='grid grid-cols-2 gap-4'>
                <Card>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-sm font-medium flex items-center'>
                      <User className='mr-2 h-4 w-4' />
                      Owner Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <div>
                      <p className='text-sm text-muted-foreground'>Name</p>
                      <p className='font-medium'>{selectedWallet.ownerName}</p>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Owner ID</p>
                      <p className='font-mono text-sm'>
                        {selectedWallet.ownerId}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Type</p>
                      {getOwnerTypeBadge(selectedWallet.ownerType)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-sm font-medium flex items-center'>
                      <DollarSign className='mr-2 h-4 w-4' />
                      Wallet Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    <div>
                      <p className='text-sm text-muted-foreground'>Wallet ID</p>
                      <p className='font-mono text-sm'>{selectedWallet.id}</p>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Balance</p>
                      <p className='font-medium text-lg'>
                        $
                        {selectedWallet.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Status</p>
                      {getStatusBadge(selectedWallet.status)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Info */}
              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-sm font-medium flex items-center'>
                    <Activity className='mr-2 h-4 w-4' />
                    Activity Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Transaction Count
                    </p>
                    <p className='font-medium'>
                      {selectedWallet.transactionCount}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Created Date
                    </p>
                    <p className='font-medium'>{selectedWallet.createdDate}</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Last Updated
                    </p>
                    <p className='font-medium'>
                      {selectedWallet.lastTransaction}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Version</p>
                    <p className='font-medium'>{selectedWallet.rawData.__v}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className='flex justify-end space-x-2'>
                {selectedWallet.status === "BLOCKED" ? (
                  <Button
                    onClick={() => {
                      handleWalletStatusToggle(selectedWallet.id, "ACTIVE");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdatingStatus}
                    className='bg-green-600 hover:bg-green-700'
                  >
                    <Unlock className='mr-2 h-4 w-4' />
                    {isUpdatingStatus ? "Updating..." : "Unblock Wallet"}
                  </Button>
                ) : (
                  <Button
                    variant='destructive'
                    onClick={() => {
                      handleWalletStatusToggle(selectedWallet.id, "BLOCKED");
                      setIsDetailsModalOpen(false);
                    }}
                    disabled={isUpdatingStatus}
                  >
                    <Lock className='mr-2 h-4 w-4' />
                    {isUpdatingStatus ? "Updating..." : "Block Wallet"}
                  </Button>
                )}
                <Button
                  variant='outline'
                  onClick={() => setIsDetailsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
