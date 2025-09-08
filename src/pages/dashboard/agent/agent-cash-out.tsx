/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
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
import {
  ArrowDownCircle,
  Search,
  DollarSign,
  User,
  Loader2,
} from "lucide-react";
import {
  useCashOutMutation,
  useGetMyTransactionsQuery,
} from "@/redux/features/transaction/transactionApi";
import { toast } from "sonner";
import { AgentCashInSkeleton } from "@/components/Loader/AgentCashInLoader";

export function AgentCashOut() {
  // Fetch agent transactions
  const { data: AgentTransactions, isLoading } = useGetMyTransactionsQuery({});
  const transactions = useMemo(
    () =>
      Array.isArray(AgentTransactions?.data)
        ? AgentTransactions.data.filter((t: any) => t.type === "cash-out")
        : [],
    [AgentTransactions?.data]
  );

  // Mutation hook
  const [cashOut, { isLoading: isProcessing }] = useCashOutMutation();

  // Form state
  const [customerPhone, setCustomerPhone] = useState("");
  const [amount, setAmount] = useState("");

  const calculateCommission = (amount: number) => {
    return (amount * 0.01).toFixed(2); // 1% commission
  };

  const handleCashOut = async () => {
    if (!customerPhone || !amount) {
      toast.error("Please enter customer phone and amount");
      return;
    }

    try {
      await cashOut({
        userPhone: customerPhone,
        amount: Number(amount),
      }).unwrap();

      toast.success("✅ Cash-out successful!");

      // Reset form
      setCustomerPhone("");
      setAmount("");
    } catch (err: any) {
      toast.error(err?.data?.message || "❌ Cash-out failed. Try again.");
      console.error("Cash-out failed:", err);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Cash Out</h1>
        <p className='text-muted-foreground'>
          Withdraw money from customer wallets and earn commissions
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* Customer phone input */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Search className='h-5 w-5' />
              <span>Customer Phone</span>
            </CardTitle>
            <CardDescription>
              Enter the customer’s registered phone number
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='customer-phone'>Phone Number</Label>
              <Input
                id='customer-phone'
                placeholder='e.g. 01712345678'
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>

            {customerPhone && (
              <div className='p-4 bg-muted/50 rounded-lg'>
                <div className='flex items-center space-x-2 mb-2'>
                  <User className='h-4 w-4' />
                  <span className='font-medium'>Selected Customer</span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Phone: {customerPhone}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction details */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <ArrowDownCircle className='h-5 w-5' />
              <span>Transaction Details</span>
            </CardTitle>
            <CardDescription>
              Enter the cash-out amount and details
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='amount'>Cash-Out Amount</Label>
              <Input
                id='amount'
                type='number'
                placeholder='0.00'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!customerPhone}
              />
            </div>

            {amount && customerPhone && (
              <div className='p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800'>
                <div className='flex items-center space-x-2 mb-2'>
                  <DollarSign className='h-4 w-4 text-blue-600' />
                  <span className='font-medium text-blue-800 dark:text-blue-200'>
                    Commission Calculation
                  </span>
                </div>
                <div className='space-y-1 text-sm'>
                  <div className='flex justify-between'>
                    <span>Transaction Amount:</span>
                    <span className='font-medium'>
                      ${Number(amount).toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Commission Rate:</span>
                    <span className='font-medium'>1.0%</span>
                  </div>
                  <div className='flex justify-between border-t pt-1'>
                    <span className='font-medium'>Your Commission:</span>
                    <span className='font-bold text-blue-600'>
                      ${calculateCommission(Number(amount))}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              className='w-full'
              onClick={handleCashOut}
              disabled={
                !customerPhone || !amount || Number(amount) <= 0 || isProcessing
              }
            >
              {isProcessing ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                "Process Cash-Out Transaction"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Cash-Out Transactions</CardTitle>
          <CardDescription>Your latest cash-out activities</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <AgentCashInSkeleton />
          ) : transactions.length === 0 ? (
            <p className='text-muted-foreground'>
              No cash-out transactions yet
            </p>
          ) : (
            <div className='space-y-4'>
              {transactions.map((t: any) => (
                <div
                  key={t._id}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center'>
                      <ArrowDownCircle className='h-5 w-5 text-blue-600' />
                    </div>
                    <div>
                      <p className='font-medium'>
                        {t.receiver?.name || "Customer"}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {new Date(t.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium'>${t.amount.toFixed(2)}</p>
                    <p className='text-sm text-blue-600'>
                      +${t.commission?.toFixed(2) || "0"} commission
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
