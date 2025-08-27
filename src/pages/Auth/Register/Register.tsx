/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Loader2,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Upload,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Shield,
  UserCheck,
  FileText,
  CreditCard,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import type { ApiError } from "@/interfaces";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, "")) // remove all non-digit
    .refine(
      (val) => /^8801[3-9]\d{8}$|^01[3-9]\d{8}$/.test(val),
      "Enter valid BD phone number (017XXXXXXXX or +8801XXXXXXXXX)"
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  identifier: z.enum(["NID", "BIRTH_CERTIFICATE"], {
    error: "Please select an identifier type",
  }),
  identifier_image: z
    .instanceof(File, { message: "Identifier image is required" })
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File must be less than 2MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only JPEG, PNG files are allowed"
    ),
  profile_picture: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "File must be less than 2MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only JPEG, PNG files are allowed"
    )
    .optional()
    .or(z.literal(undefined)),
  role: z.enum(["USER", "AGENT"], {
    error: "Please select a role",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const [
    registerUser,
    { isLoading: isRegistering, isSuccess, isError, error },
  ] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [identifierPreview, setIdentifierPreview] = useState<string | null>(
    null
  );
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      identifier: "NID",
      role: "USER",
    },
  });

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(
    form.watch("password") || ""
  );

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 80) return "Medium";
    return "Strong";
  };

  const getFormProgress = () => {
    const values = form.getValues();
    const requiredFields = [
      "name",
      "email",
      "phone",
      "password",
      "identifier",
      "identifier_image",
      "role",
    ];
    const completed = requiredFields.filter((field) => {
      const fieldValue = values[field as keyof RegisterFormData];
      return field === "identifier_image"
        ? fieldValue instanceof File
        : fieldValue;
    }).length;
    return (completed / requiredFields.length) * 100;
  };

  const handleFileChange = (
    file: File | undefined,
    type: "identifier" | "profile"
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === "identifier") {
          setIdentifierPreview(result);
        } else {
          setProfilePreview(result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (type === "identifier") {
        setIdentifierPreview(null);
      } else {
        setProfilePreview(null);
      }
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      console.log("[v0] Register FormData entries:");
      for (const [key, value] of formData.entries()) {
        console.log(
          `[v0] ${key}:`,
          value instanceof File ? `File: ${value.name}` : value
        );
      }

      if (registerUser) {
        await registerUser(formData);

        toast.success(
          data.role === "AGENT"
            ? "Agent account created! Your account is pending approval."
            : "Account created successfully! Please log in."
        );
      } else {
        // Fallback simulation for development
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.success(
          data.role === "AGENT"
            ? "Agent account created! Your account is pending approval."
            : "Account created successfully! Please log in."
        );
      }
    } catch (error: any) {
      console.error("[v0] Registration error:", error);

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "An error occurred during registration. Please try again.";
      toast.error(errorMessage);
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
          Registration Successful!
        </h2>
        <p className='text-muted-foreground mb-6'>
          Your account has been created successfully. You will be redirected to
          login in <span className='font-semibold'>5 seconds</span>.
        </p>

        {/* Manual button to login */}
        <Button
          asChild
          className='bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700'
        >
          <Link to='/login'>Continue to Sign In</Link>
        </Button>
      </motion.div>
    );
  }
  const apiError = error as ApiError;
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
          Create Your Account
        </h1>
        <p className='text-muted-foreground mt-2 text-sm sm:text-base'>
          Join thousands of users managing their digital wallet
        </p>

        <div className='mt-6 space-y-3'>
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>Progress</span>
            <span>{Math.round(getFormProgress())}% complete</span>
          </div>
          <Progress value={getFormProgress()} className='h-2' />
        </div>
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
              <span className='text-sm font-medium'>Registration failed</span>
            </div>
            <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
              {apiError?.data?.message ||
                "Please check your information and try again."}
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
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                        <User className='w-4 h-4 text-rose-500' />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className='relative group'>
                          <Input
                            {...field}
                            placeholder='Enter your full name'
                            className='h-12 pl-4 pr-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-gray-600'
                            autoComplete='name'
                            aria-describedby='name-description'
                          />
                          {field.value && !form.formState.errors.name && (
                            <CheckCircle2 className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500' />
                          )}
                        </div>
                      </FormControl>
                      <AnimatePresence>
                        {form.formState.errors.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FormMessage className='flex items-center gap-1 text-red-500'>
                              <AlertCircle className='w-3 h-3' />
                              {form.formState.errors.name.message}
                            </FormMessage>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                        <Mail className='w-4 h-4 text-rose-500' />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className='relative group'>
                          <Input
                            {...field}
                            type='email'
                            placeholder='jane@example.com'
                            className='h-12 pl-4 pr-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-gray-600'
                            autoComplete='email'
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                        <Phone className='w-4 h-4 text-rose-500' />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className='relative group'>
                          <Input
                            {...field}
                            placeholder='01XXXXXXXXX'
                            className='h-12 pl-4 pr-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-gray-600'
                            autoComplete='tel'
                          />
                          {field.value && !form.formState.errors.phone && (
                            <CheckCircle2 className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500' />
                          )}
                        </div>
                      </FormControl>
                      <p className='text-xs text-muted-foreground mt-1'>
                        Use format 01XXXXXXXXX
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                        <Lock className='w-4 h-4 text-rose-500' />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative group'>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder='••••••••'
                            className='h-12 pl-4 pr-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 group-hover:border-gray-300 dark:group-hover:border-gray-600'
                            autoComplete='password'
                          />
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent'
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className='h-4 w-4 text-gray-400' />
                            ) : (
                              <Eye className='h-4 w-4 text-gray-400' />
                            )}
                          </Button>
                        </div>
                      </FormControl>

                      {/* Password strength indicator */}
                      {field.value && (
                        <div className='mt-2 space-y-2'>
                          <div className='flex items-center justify-between text-xs'>
                            <span className='text-muted-foreground'>
                              Password strength
                            </span>
                            <span
                              className={`font-medium ${
                                passwordStrength < 40
                                  ? "text-red-500"
                                  : passwordStrength < 80
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                            >
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5'>
                            <div
                              className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FormField
                  control={form.control}
                  name='identifier'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                        <FileText className='w-4 h-4 text-rose-500' />
                        Identifier Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='h-12 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'>
                            <SelectValue placeholder='Select identifier type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='NID'>
                            <div className='flex items-center gap-2'>
                              <CreditCard className='w-4 h-4' />
                              National ID (NID)
                            </div>
                          </SelectItem>
                          <SelectItem value='BIRTH_CERTIFICATE'>
                            <div className='flex items-center gap-2'>
                              <FileText className='w-4 h-4' />
                              Birth Certificate
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <FormField
                  control={form.control}
                  name='identifier_image'
                  render={({ field: { onChange, ref, name } }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                        <Upload className='w-4 h-4 text-rose-500' />
                        ID Document Image{" "}
                        <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <div className='space-y-3'>
                          <div className='relative'>
                            <Input
                              type='file'
                              accept='image/jpeg,image/png,image/jpg'
                              name={name}
                              ref={ref}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                onChange(file); // update React Hook Form
                                handleFileChange(file, "identifier"); // preview
                              }}
                              className='h-12 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700
                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm
                file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100
                dark:file:bg-rose-900/20 dark:file:text-rose-300'
                            />
                          </div>

                          {identifierPreview && (
                            <div className='relative inline-block'>
                              <img
                                src={identifierPreview || "/placeholder.svg"}
                                alt='ID Document Preview'
                                className='w-24 h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700'
                              />
                              <Button
                                type='button'
                                variant='destructive'
                                size='sm'
                                className='absolute -top-2 -right-2 w-6 h-6 rounded-full p-0'
                                onClick={() => {
                                  form.setValue("profile_picture", undefined);
                                  setIdentifierPreview(null);
                                }}
                              >
                                <X className='w-3 h-3' />
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <p className='text-xs text-muted-foreground'>
                        Upload your {form.watch("identifier")} image (Max 2MB,
                        JPEG/PNG only)
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <FormField
                  control={form.control}
                  name='profile_picture'
                  render={({ field: { onChange, ref, name } }) => (
                    <FormItem>
                      <FormLabel>Profile Picture (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          accept='image/jpeg,image/png,image/jpg'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file); // update React Hook Form state
                            handleFileChange(file, "profile"); // update preview
                          }}
                          name={name}
                          ref={ref} // React Hook Form ref
                          className='h-12 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 file:mr-4 file:py-2 file:px-4 ...'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {profilePreview && (
                  <div className='relative inline-block'>
                    <img
                      src={profilePreview || "/placeholder.svg"}
                      alt='ID Document Preview'
                      className='w-24 h-24 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700'
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      className='absolute -top-2 -right-2 w-6 h-6 rounded-full p-0'
                      onClick={() => {
                        form.setValue("profile_picture", undefined);
                        setIdentifierPreview(null);
                      }}
                    >
                      <X className='w-3 h-3' />
                    </Button>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2'>
                        <Shield className='w-4 h-4 text-rose-500' />
                        Account Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='h-12 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'>
                            <SelectValue placeholder='Select account type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='USER'>
                            <div className='flex items-center gap-2'>
                              <User className='w-4 h-4' />
                              <div>
                                <div className='font-medium'>User Account</div>
                                <div className='text-xs text-muted-foreground'>
                                  Personal wallet management
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value='AGENT'>
                            <div className='flex items-center gap-2'>
                              <UserCheck className='w-4 h-4' />
                              <div>
                                <div className='font-medium'>Agent Account</div>
                                <div className='text-xs text-muted-foreground'>
                                  Business services (pending approval)
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className='text-xs text-muted-foreground mt-1'>
                        {field.value === "AGENT" &&
                          "Agent accounts require approval and will start as 'pending'"}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type='submit'
                  className='w-full h-12 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-700 hover:via-rose-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={isRegistering}
                  aria-describedby='submit-description'
                >
                  {isRegistering ? (
                    <>
                      <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                      Creating your account...
                    </>
                  ) : (
                    <>
                      <Sparkles className='w-5 h-5 mr-2' />
                      Create Account
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
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className='text-rose-600 hover:underline font-medium'
                  >
                    <Button
                      variant='link'
                      className='p-0 h-auto text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-semibold'
                    >
                      Sign in here
                    </Button>
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
