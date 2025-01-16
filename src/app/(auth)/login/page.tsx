"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppleIcon from "@/components/icons/AppleIcon";
import GithubIcon from "@/components/icons/GithubIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <h1 className="text-5xl font-semibold mb-10">Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                  <Input
                    className="py-6 px-4 text-lg"
                    placeholder="Example@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <p className="text-lg">Don&apos;t have an account?</p>
            <Link href="/register" className="underline">
              Register here
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>

      <div className="relative mt-8 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant={"outline"}
          size={"icon"}
          className="p-7 h-12 w-12 rounded-lg"
        >
          <AppleIcon className="svg-class" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="p-7 h-12 w-12 rounded-lg"
        >
          <GithubIcon className="svg-class" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="p-7 h-12 w-12 rounded-lg"
        >
          <GoogleIcon className="svg-class" />
        </Button>
      </div>
    </>
  );
};

export default Login;
