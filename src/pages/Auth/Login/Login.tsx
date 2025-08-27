"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading: isLoggingIn, isSuccess, isError, error }] =
    useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // 🔹 Type guards for error handling
  const isFetchError = (err: unknown): err is FetchBaseQueryError =>
    typeof err === "object" && err != null && "status" in err;

  const isSerialized = (err: unknown): err is SerializedError =>
    typeof err === "object" && err != null && "message" in err;

  const getErrorMessage = (err: unknown) => {
    if (isFetchError(err))
      return (err.data as { message?: string })?.message ?? "Server error";
    if (isSerialized(err)) return err.message ?? "Unknown error";
    return "Something went wrong";
  };

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login data:", data);
    try {
      await loginUser(data).unwrap();
      toast.success("Login successful!");
      navigate("/"); // redirect after success
    } catch (err) {
      console.error("Login error:", err);
      toast.error(getErrorMessage(err));
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className='w-full max-w-md mx-auto text-center p-8'
      >
        <div className='flex items-center justify-center mb-4'>
          <div className='p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg'>
            <CheckCircle2 className='w-8 h-8 text-white' />
          </div>
        </div>
        <h2 className='text-2xl font-bold text-green-600 mb-2'>
          Login Successful!
        </h2>
        <p className='text-muted-foreground mb-6'>You are now logged in.</p>
      </motion.div>
    );
  }

  return (
    <div className='w-full max-w-lg mx-auto px-4 sm:px-0'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-8'
      >
        <div className='flex items-center justify-center mb-4'>
          <div className='p-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg'>
            <Sparkles className='w-6 h-6 text-white' />
          </div>
        </div>
        <h1 className='text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent dark:from-rose-400 dark:to-pink-400'>
          Welcome Back
        </h1>
        <p className='text-muted-foreground mt-2 text-sm sm:text-base'>
          Sign in to your account
        </p>
      </motion.div>

      <AnimatePresence>
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'
          >
            <div className='flex items-center gap-2 text-red-600 dark:text-red-400'>
              <AlertCircle className='w-4 h-4' />
              <span className='text-sm font-medium'>Login failed</span>
            </div>
            <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
              {getErrorMessage(error)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className='border-0 shadow-2xl bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800'>
        <CardContent className='p-6 sm:p-8'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
              noValidate
            >
              {/* Email field */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                      <Mail className='w-4 h-4 text-rose-500' /> Email
                    </FormLabel>
                    <FormControl>
                      <div className='relative group'>
                        <Input
                          {...field}
                          type='email'
                          placeholder='jane@example.com'
                          autoFocus
                        />
                        {field.value && !form.formState.errors.email && (
                          <CheckCircle2 className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500' />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                      <Lock className='w-4 h-4 text-rose-500' /> Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative group'>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder='••••••••'
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute right-0 top-0 h-12 px-3 py-2'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type='submit'
                  className='w-full h-12'
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Sparkles className='w-5 h-5 mr-2' />
                      Sign In
                    </>
                  )}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className='text-center pt-4'
              >
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  New Here?{" "}
                  <Link
                    to={"/signup"}
                    className='text-rose-600 hover:underline font-medium'
                  >
                    <Button
                      variant='link'
                      className='p-0 h-auto text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-semibold'
                    >
                      Sign up here
                    </Button>
                  </Link>
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Forgot Password{" "}
                  <Link
                    to={"/forgot-password"}
                    className='text-rose-600 hover:underline font-medium'
                  >
                    Reset here
                  </Link>
                </p>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
