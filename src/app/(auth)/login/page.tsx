"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormInput from "../formInput";
import ThirdPartyButtons from "../thirdPartyButtons";
import { loginSchema as formSchema, LoginFormValues } from "@/schemas/authForm";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

    const handleThirdParty = async (provider: "google" | "github") => {
      console.log(`Signing in with ${provider}`);
      await signIn(provider);
    };

  const onSubmit = async (values: LoginFormValues) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error in Registration: ${errorData.error}: ${errorData.details}`);
      throw new Error(errorData.error || "Failed to Login");
    }

    const body = await response.json();

    if (body.userSurveyed === false) {
      router.push("/register/survey");
    } else {
      router.push("/profile");
    }
  };

  return (
    <>
      <header>
        <h1 className="text-5xl font-semibold mb-10">Login</h1>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4">
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
            description="Password must be at least 8 characters."
          />

          <div>
            <p className="text-lg">Don&apos;t have an account?</p>
            <Link
              href="/register"
              className="underline">
              Register here
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-6 px-4 text-lg">
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
        <ThirdPartyButtons
          onClick={() => handleThirdParty("github")}
          icon="github"
        />
        <ThirdPartyButtons
          onClick={() => handleThirdParty("google")}
          icon="google"
        />
      </div>
    </>
  );
};

export default Login;
