"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Calendar, Shield, Camera, Save, Edit } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

type UserFormValues = {
  name: string;
  phone: string;
  password?: string;
  profile_picture?: File | string;
};

type PasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function AgentProfile() {
  const { data, isLoading } = useGetUserInfoQuery(undefined);
  const profileInfo = data?.data;

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [changePassword] = useChangePasswordMutation();
  const [isEditing, setIsEditing] = useState(true);

  const form = useForm<UserFormValues>({
    defaultValues: {
      name: profileInfo?.name || "",
      phone: profileInfo?.phone || "",
      password: "",
      profile_picture: profileInfo?.profile_picture || "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [preferences, setPreferences] = useState({
    twoFactorAuth: profileInfo?.twoFactorAuth || false,
    emailNotifications: profileInfo?.emailNotifications || false,
    smsNotifications: profileInfo?.smsNotifications || false,
    pushNotifications: profileInfo?.pushNotifications || false,
    marketingEmails: profileInfo?.marketingEmails || false,
  });

  useEffect(() => {
    if (profileInfo) {
      form.reset({
        name: profileInfo.name,
        phone: profileInfo.phone,
        password: "",
        profile_picture: profileInfo.profile_picture,
      });
    }
  }, [form, profileInfo]);

  const handleAvatarChange = (file: File) => {
    form.setValue("profile_picture", file);
  };

  const handleSaveProfile = async (values: UserFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      if (values.password) formData.append("password", values.password);
      if (values.profile_picture instanceof File) {
        formData.append("profile_picture", values.profile_picture);
      }

      await updateUserInfo(formData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async (values: PasswordFormValues) => {
    const { oldPassword, newPassword, confirmPassword } = values;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All password fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match");
    }

    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password changed successfully");
      passwordForm.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  if (isLoading || !profileInfo) {
    return <div className='animate-pulse space-y-6'>Loading profile...</div>;
  }

  const avatarValue = form.getValues("profile_picture");

  let avatarSrc: string | undefined;
  if (avatarValue instanceof File) {
    avatarSrc = URL.createObjectURL(avatarValue);
  } else if (typeof avatarValue === "string") {
    avatarSrc = avatarValue;
  } else {
    avatarSrc = undefined;
  }
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
        <p className='text-muted-foreground'>
          Manage your account information and preferences
        </p>
      </div>

      <Tabs defaultValue='profile' className='w-full'>
        <TabsList>
          <TabsTrigger value='profile'>Profile Info</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='preferences'>Preferences</TabsTrigger>
        </TabsList>

        {/* ===== PROFILE INFO TAB ===== */}
        <TabsContent value='profile' className='space-y-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveProfile)}>
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      type='button' // <--- important! so it doesn't submit form immediately
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => {
                        if (isEditing) {
                          handleSaveProfile(form.getValues()); // only call API on save
                        } else {
                          setIsEditing(true); // enable editing
                        }
                      }}
                    >
                      {isEditing ? (
                        <>
                          <Save className='mr-2 h-4 w-4' /> Save
                        </>
                      ) : (
                        <>
                          <Edit className='mr-2 h-4 w-4' /> Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className='space-y-6'>
                  {/* Avatar */}
                  <div className='flex items-center space-x-4'>
                    <div className='relative'>
                      <Avatar className='h-20 w-20'>
                        <AvatarImage src={avatarSrc} />
                        <AvatarFallback>
                          {form.getValues("name").charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <label className='absolute -bottom-2 -right-2 cursor-pointer h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                          <Camera className='h-4 w-4' />
                          <input
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={(e) => {
                              if (e.target.files?.[0])
                                handleAvatarChange(e.target.files[0]);
                            }}
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <p className='font-semibold'>{form.getValues("name")}</p>
                      <p className='text-muted-foreground'>
                        {profileInfo.email}
                      </p>
                      <Badge variant='default'>{profileInfo.verified}</Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor='name'>Full Name</Label>
                          <FormControl>
                            <Input {...field} id='name' disabled={!isEditing} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor='phone'>Phone</Label>
                          <FormControl>
                            <Input
                              {...field}
                              id='phone'
                              disabled={!isEditing}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor='password'>Password</Label>
                          <FormControl>
                            <Input
                              {...field}
                              id='password'
                              type='password'
                              placeholder='Leave blank to keep current'
                              disabled={!isEditing}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm'>
                        Joined:{" "}
                        {new Date(profileInfo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Shield className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm'>
                        Status: {profileInfo.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </TabsContent>

        {/* ===== SECURITY TAB ===== */}
        <TabsContent value='security' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handleChangePassword)}
                  className='space-y-4'
                >
                  <Input
                    type='password'
                    placeholder='Current password'
                    {...passwordForm.register("oldPassword")}
                  />
                  <Input
                    type='password'
                    placeholder='New password'
                    {...passwordForm.register("newPassword")}
                  />
                  <Input
                    type='password'
                    placeholder='Confirm new password'
                    {...passwordForm.register("confirmPassword")}
                  />
                  <Button type='submit'>Update Password</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== PREFERENCES TAB ===== */}
        <TabsContent value='preferences' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {[
                {
                  label: "Email Notifications",
                  key: "emailNotifications",
                  description: "Receive transaction alerts via email",
                },
                {
                  label: "SMS Notifications",
                  key: "smsNotifications",
                  description: "Receive important updates via SMS",
                },
                {
                  label: "Push Notifications",
                  key: "pushNotifications",
                  description: "Receive push notifications",
                },
                {
                  label: "Marketing Emails",
                  key: "marketingEmails",
                  description: "Receive promotional offers",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className='flex items-center justify-between'
                >
                  <div className='space-y-0.5'>
                    <Label>{item.label}</Label>
                    <p className='text-sm text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>
                  <Switch
                    checked={preferences[item.key as keyof typeof preferences]}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        [item.key]: checked,
                      }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
