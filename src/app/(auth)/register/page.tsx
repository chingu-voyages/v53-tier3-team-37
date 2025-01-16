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

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    confirmPassword: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-5xl font-semibold mb-10">Register</h1>

      <div className="flex items-center justify-center gap-4 mb-6">
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

      <div className="relative mb-8 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or Sign up with Email
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example@mail.com"
                    type="email"
                    className="py-6 px-4 text-lg"
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
                  <Input
                    placeholder="Must be at least 2 characters"
                    type="password"
                    className="py-6 px-4 text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Must be the same as above"
                    type="password"
                    className="py-6 px-4 text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col  justify-center">
            <p>Already have an account?</p>
            <Link href="/login" className="underline">
              Login here
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Register;
