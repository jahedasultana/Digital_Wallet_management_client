"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Eye, EyeOff } from "lucide-react";
import { useGetAgentWalletMeQuery } from "@/redux/features/wallet/walletApi";

export function AgentWallet() {
  const [showBalance, setShowBalance] = useState(true);
  const {
    data: agentWalletData,
    isLoading,
    isError,
  } = useGetAgentWalletMeQuery({});

  if (isLoading) return <p>Loading wallet info...</p>;
  if (isError) return <p>Error loading wallet info.</p>;

  const wallet = agentWalletData?.data;

  return (
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4'>
      {/* Balance Card */}
      <AnimatePresence mode='wait'>
        <motion.div
          key='balance'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card>
            <CardHeader className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Wallet className='h-5 w-5' />
                <CardTitle>Balance</CardTitle>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            </CardHeader>
            <CardContent className='min-h-[120px] flex items-center justify-center'>
              <motion.div
                key={showBalance ? "shown" : "hidden"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='text-2xl font-bold'
              >
                {showBalance ? `$${wallet.balance.toFixed(2)}` : "••••••"}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Status Card */}
      <motion.div
        key='status'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className='min-h-[120px] flex items-center justify-center text-xl font-semibold'>
            {wallet.status}
          </CardContent>
        </Card>
      </motion.div>

      {/* Created At Card */}
      <motion.div
        key='createdAt'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Created At</CardTitle>
          </CardHeader>
          <CardContent className='min-h-[120px] flex items-center justify-center text-sm text-muted-foreground text-center'>
            {new Date(wallet.createdAt).toLocaleString()}
          </CardContent>
        </Card>
      </motion.div>

      {/* Updated At Card */}
      <motion.div
        key='updatedAt'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Updated At</CardTitle>
          </CardHeader>
          <CardContent className='min-h-[120px] flex items-center justify-center text-sm text-muted-foreground text-center'>
            {new Date(wallet.updatedAt).toLocaleString()}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
