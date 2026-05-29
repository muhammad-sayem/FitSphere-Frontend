/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/services/auth.services";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: (payload: RegisterFormValues) => registerAction(payload),
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

        if (!result.success) {
          const errorMsg = result.message || "Registration failed!";
          setServerError(errorMsg);
          toast.error(errorMsg, { position: "top-center" });
          return;
        }

        toast.success("Registration successful!", { position: "top-center" });
        const normalizedRole = result.role?.toLowerCase();

        if (normalizedRole === "trainer") {
          router.push("/trainer-dashboard");
          return;
        }

        router.push("/dashboard");
      } 
      
      catch (error: any) {
        const errorMsg = `Registration failed: ${error.message}`;
        console.log(errorMsg);
        setServerError(errorMsg);
        toast.error(errorMsg, { position: "top-center" });
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/60 bg-background/95 shadow-lg backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign up with your name, image, role, email and password.
          </CardDescription>
        </CardHeader>

        <CardContent>
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
              <p className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {serverError}
              </p>
            ) : null}

            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Enter your name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="image">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Image</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept="image/*"
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      field.handleChange(file);
                    }}
                  />
                  {field.state.value ? (
                    <p className="text-xs text-muted-foreground">Selected: {field.state.value.name}</p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field name="role">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Role</Label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value as "USER" | "TRAINER")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50"
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
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Enter your email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    placeholder="Enter your password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;