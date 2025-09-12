/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/auth/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const toastId = toast.loading("login processing...");
    try {
      await login(userInfo).unwrap();
      toast.success("User login successfully", { id: toastId });
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full"
                  {...field}
                  required
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your Password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-xl mt-2">
          {isLoading ? "Login..." : "Login"}
        </Button>
        <p className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <Link to="/register/user" className="text-primary font-medium">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
}
