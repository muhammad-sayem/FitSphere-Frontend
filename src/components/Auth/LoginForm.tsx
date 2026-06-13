/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ILoginPayload } from "@/app/types/auth.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/services/auth.services";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          const errorMsg = result.message || "Login failed!";
          setServerError(errorMsg);
          toast.error(errorMsg, { position: "top-right" });
          return;
        }

        toast.success("Login successful!", { position: "top-right" });
        router.push("/");
      } catch (error: any) {
        setServerError(`Login failed: ${error.message}`);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">

        <div className="bg-primary-01 text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-white leading-relaxed">
            Sign in to continue your journey. Manage your dashboard, track your activity, and stay connected.
          </p>

          <div className="mt-8 space-y-3 text-sm text-white">
            <p>✔ Secure login system</p>
            <p>✔ Fast dashboard access</p>
            <p>✔ Role based control</p>
          </div>
        </div>

        <div className="p-10 bg-white">
          <h2 className="text-2xl font-bold text-black mb-1">Login</h2>
          <p className="text-secondary-01 mb-6">Enter your credentials to continue</p>

          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label className="text-black">Email</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-gray-300 focus:border-primary-01 focus:ring-primary-01 text-black rounded-xl"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <Label className="text-black">Password</Label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pr-10 border-gray-300 focus:border-primary-01 focus:ring-primary-01 text-black rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-01 hover:text-primary-01"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  className="w-full bg-primary-01 text-white font-semibold rounded-xl hover:opacity-90 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Sign In"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <p className="mt-6 text-sm text-secondary-01 text-center">
            Don’t have an account?{" "}
            <Link href="/register" className="text-primary-01 font-semibold underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;