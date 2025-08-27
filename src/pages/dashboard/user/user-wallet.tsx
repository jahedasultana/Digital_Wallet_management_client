/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Plus, Minus, Send, Eye, EyeOff } from "lucide-react";
import { useGetUserStatsQuery } from "@/redux/features/stats/statsApi";
import { toast } from "sonner";

import {
  useSendMoneyMutation,
  useTopUpWalletMutation,
  useWithdrawWalletMutation,
} from "@/redux/features/wallet/walletApi";
import { Skeleton } from "@/components/ui/skeleton";

export function UserWallet() {
  const { data, isLoading, refetch } = useGetUserStatsQuery(undefined);
  const wallet = data?.data?.balance || 0;

  const [showBalance, setShowBalance] = useState(true);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // RTK Query Mutations
  const [topUp, { isLoading: isTopUpLoading }] = useTopUpWalletMutation();
  const [withdraw, { isLoading: isWithdrawLoading }] = useWithdrawWalletMutation();
  const [sendMoney, { isLoading: isSendLoading }] = useSendMoneyMutation();

  // Top-up handler
  const handleTopUp = async (amount?: number) => {
    const finalAmount = amount || Number(topUpAmount);
    if (!finalAmount || finalAmount <= 0) return toast.error("Enter a valid amount");

    try {
      const res = await topUp({ amount: finalAmount }).unwrap();
      toast.success(res.message || `Wallet topped up $${finalAmount}`);
      setTopUpAmount("");
      // Auto refresh wallet data
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error topping up");
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return toast.error("Enter a valid amount");
    try {
      const res = await withdraw({ amount: Number(withdrawAmount) }).unwrap();
      toast.success(res.message || `Withdrawn $${withdrawAmount}`);
      setWithdrawAmount("");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error withdrawing");
    }
  };

  const handleSend = async () => {
    if (!sendAmount || Number(sendAmount) <= 0) return toast.error("Enter a valid amount");
    if (!recipient) return toast.error("Enter recipient phone or email");
    try {
      const res = await sendMoney({
        receiverPhone: recipient,
        amount: Number(sendAmount),
      }).unwrap();
      toast.success(res.message || `Sent $${sendAmount} to ${recipient}`);
      setSendAmount("");
      setRecipient("");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error sending money");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-32" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-40 mb-2" />
            <Skeleton className="h-4 w-24" />
          </CardContent>
        </Card>
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-72 w-full" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground">Manage your wallet balance and transactions</p>
      </div>

      {/* Balance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <CardTitle>Current Balance</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{showBalance ? `$${wallet.toFixed(2)}` : "••••••"}</div>
          <p className="text-sm text-muted-foreground mt-2">Available balance</p>
        </CardContent>
      </Card>

      {/* Wallet Tabs */}
      <Tabs defaultValue="topup" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="topup">Top Up</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="send">Send Money</TabsTrigger>
        </TabsList>

        {/* Top Up */}
        <TabsContent value="topup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Money</span>
              </CardTitle>
              <CardDescription>Add funds to your wallet from your bank account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topup-amount">Amount</Label>
                <Input
                  id="topup-amount"
                  type="number"
                  placeholder="0.00"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={() => handleTopUp()} disabled={isTopUpLoading}>
                {isTopUpLoading ? "Processing..." : `Add $${topUpAmount || "0.00"}`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdraw */}
        <TabsContent value="withdraw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Minus className="h-5 w-5" />
                <span>Withdraw Money</span>
              </CardTitle>
              <CardDescription>Transfer funds from your wallet to your bank account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleWithdraw} disabled={isWithdrawLoading}>
                {isWithdrawLoading ? "Processing..." : `Withdraw $${withdrawAmount || "0.00"}`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Send Money */}
        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Send Money</span>
              </CardTitle>
              <CardDescription>Send money to friends and family instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  placeholder="Phone or email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="send-amount">Amount</Label>
                <Input
                  id="send-amount"
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleSend} disabled={isSendLoading}>
                {isSendLoading ? "Processing..." : `Send $${sendAmount || "0.00"}`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[50, 100].map((amt) => (
              <Button
                key={amt}
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent"
                onClick={() => handleTopUp(amt)}
                disabled={isTopUpLoading}
              >
                <Plus className="h-6 w-6" />
                <span className="text-sm">Add ${amt}</span>
              </Button>
            ))}
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Send className="h-6 w-6" />
              <span className="text-sm">Split Bill</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Wallet className="h-6 w-6" />
              <span className="text-sm">Request</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
