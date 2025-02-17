"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormInput from "../formInput";
import ThirdPartyButtons from "../thirdPartyButtons";
import { registerSchema, RegisterFormValues } from "@/schemas/authForm";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Register = () => {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleThirdParty = async (provider: "google" | "github") => {
    console.log(`Signing in with ${provider}`);
    await signIn(provider);
  };

  // TODO: Add third party auth this function is only tied to the form submit right now.
  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
    const registrationBody = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    console.log(registrationBody);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationBody),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse error response, if available
        alert(
          `Error in Registration: ${errorData.error}: ${errorData.details}`
        );
        throw new Error(errorData.error || "Failed to register user");
      }
      router.push("/register/survey");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <>
      <header>
        <h1 className="text-5xl font-semibold mb-10">Register</h1>
      </header>

      <div className="flex items-center justify-center gap-4 mb-2">
        {/* <ThirdPartyButtons onClick={() => {}} icon="apple" /> */}
        <ThirdPartyButtons
          onClick={() => handleThirdParty("github")}
          icon="github"
        />
        <ThirdPartyButtons
          onClick={() => handleThirdParty("google")}
          icon="google"
        />
      </div>

      <p className="bg-background px-2 my-4">Or Sign up with Email</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">
          <FormInput
            placeholder="Jane Doe"
            name="name"
            label="Name"
            type="name"
            form={form}
            description="This is the email you will use to login."
          />

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
            <Link
              href="/login"
              className="underline">
              Login here
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-6 px-4 text-lg">
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Register;
