/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { httpClient } from "@/lib/axios/httpClient";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type RegisterFormValues = {
  name: string;
  image: File | null;
  role: "USER" | "TRAINER";
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: RegisterFormValues) => {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          name: payload.name,
          role: payload.role,
          email: payload.email,
          password: payload.password,
        })
      );

      if (payload.image instanceof File) {
        formData.append("file", payload.image);
      }

      const response = await httpClient.post("/auth/register", formData);
      return response;
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      image: null,
      role: "USER",
      email: "",
      password: "",
    } as RegisterFormValues,

    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = (await mutateAsync(value)) as any;
        const responseData = result?.data ?? result;

        if (!responseData?.success && !responseData?.data && !responseData?.user) {
          const errorMsg = responseData?.message || "Registration failed!";
          setServerError(errorMsg);
          toast.error(errorMsg, { position: "top-center" });
          return;
        }

        toast.success("Registration successful!", { position: "top-center" });

        // const normalizedRole =
        //   responseData?.data?.user?.role?.toLowerCase() ??
        //   responseData?.user?.role?.toLowerCase() ??
        //   responseData?.role?.toLowerCase();

        // if (normalizedRole === "trainer") {
        //   router.push("/trainer-dashboard");
        //   return;
        // }

        router.push("/");
      } 
      catch (error: any) {
        const errorMsg = `Registration failed: ${error.message}`;
        setServerError(errorMsg);
        toast.error(errorMsg, { position: "top-center" });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">

        <div className="bg-primary-01 text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Create Account</h1>
          <p className="text-white/80 leading-relaxed">
            Join us today. Build your profile, choose your role, and start your journey with full access.
          </p>

          <div className="mt-8 space-y-3 text-sm text-white/90">
            <p>✔ Easy registration process</p>
            <p>✔ Secure authentication</p>
            <p>✔ Role based dashboard access</p>
          </div>
        </div>

        <div className="p-10 bg-white">
          <h2 className="text-2xl font-bold text-black mb-1">Register</h2>
          <p className="text-secondary-01 mb-6">
            Fill in your details to create account
          </p>

          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {serverError ? (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                {serverError}
              </p>
            ) : null}

            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label className="text-black">Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-gray-300 focus:border-primary-01 focus:ring-primary-01 text-black rounded-xl"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="image">
              {(field) => (
                <div className="space-y-2">
                  <Label className="text-black">Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      field.handleChange(file);
                    }}
                    className="border-gray-300 focus:border-primary-01 focus:ring-primary-01 text-black rounded-xl"
                  />
                  {field.state.value ? (
                    <p className="text-xs text-secondary-01">
                      Selected: {field.state.value.name}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field name="role">
              {(field) => (
                <div className="space-y-2">
                  <Label className="text-black">Role</Label>
                  <select
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value as "USER" | "TRAINER")
                    }
                    className="w-full h-10 rounded-xl border border-gray-300 px-3 text-sm text-black focus:border-primary-01 outline-none"
                  >
                    <option value="USER">USER</option>
                    <option value="TRAINER">TRAINER</option>
                  </select>
                </div>
              )}
            </form.Field>

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
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <p className="mt-6 text-sm text-secondary-01 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-01 font-semibold underline"
            >
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;