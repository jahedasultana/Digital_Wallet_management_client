/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useNavigate, useSearchParams } from "react-router"; // use react-router-dom

const resetSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

type ResetFormData = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const navigation = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const form = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { newPassword: "" },
  });

  const onSubmit = async (data: ResetFormData) => {
    if (!id || !token) {
      toast.error("Invalid or missing reset link");
      return;
    }

    try {
      await resetPassword({
        id,
        token,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password Changed Successfully!");
      navigation("/login");
    } catch (err: any) {
      console.error(err);
      const message = err?.data?.message || "Failed to reset password";
      toast.error(message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6'>
        <h2 className='text-2xl font-bold text-center text-gray-800 dark:text-gray-200'>
          Reset Password
        </h2>
        <p className='text-sm text-gray-600 dark:text-gray-400 text-center'>
          Enter your new password below.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                      <Input
                        {...field}
                        type='password'
                        placeholder='********'
                        className='pl-10'
                        autoComplete='new-password'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
