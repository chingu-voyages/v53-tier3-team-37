"use client";

import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormInput from "../formInput";
import ThirdPartyButtons from "../thirdPartyButtons";

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

  // TODO: Add third party auth this function is only tied to the form submit right now.
  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-5xl font-semibold mb-10">Register</h1>

      <div className="flex items-center justify-center gap-4 mb-6">
        <ThirdPartyButtons onClick={() => {}} icon="apple" />
        <ThirdPartyButtons onClick={() => {}} icon="github" />
        <ThirdPartyButtons onClick={() => {}} icon="google" />
      </div>

      <div className="relative mb-8 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or Sign up with Email
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            placeholder="Example@mail.com"
            name="email"
            label="Email"
            type="email"
            form={form}
          />

          <FormInput
            placeholder="Must be at least 2 characters"
            name="password"
            label="Password"
            type="password"
            form={form}
          />

          <FormInput
            placeholder="Must be the same as above"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            form={form}
          />

          <div className="flex flex-col  justify-center">
            <p>Already have an account?</p>
            <Link href="/login" className="underline">
              Login here
            </Link>
          </div>

          <Button type="submit" className="w-full py-6 px-4 text-lg">
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Register;
