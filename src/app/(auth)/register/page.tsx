"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormInput from "../formInput";
import ThirdPartyButtons from "../thirdPartyButtons";
import { registerSchema, RegisterFormValues } from "@/schemas/authForm";

const Register = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // TODO: Add third party auth this function is only tied to the form submit right now.
  const onSubmit = (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <>
      <header>
        <h1 className="text-5xl font-semibold mb-10">Register</h1>
      </header>

      <div className="flex items-center justify-center gap-4 mb-2">
        <ThirdPartyButtons onClick={() => {}} icon="apple" />
        <ThirdPartyButtons onClick={() => {}} icon="github" />
        <ThirdPartyButtons onClick={() => {}} icon="google" />
      </div>

      <p className="bg-background px-2 my-4">Or Sign up with Email</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            placeholder="Example@mail.com"
            name="email"
            label="Email"
            type="email"
            form={form}
            description="This is the email you will use to login."
          />

          <FormInput
            placeholder="********"
            name="password"
            label="Password"
            type="password"
            form={form}
            description="This is the password you will use to login."
          />

          <FormInput
            placeholder="********"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            form={form}
            description="Must be the same as above."
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
