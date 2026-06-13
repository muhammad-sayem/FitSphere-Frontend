/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { logoutAction } from "@/services/auth.services";

const linkClassName =
  "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground";

const Navbar = ({ loggedInUser }: { loggedInUser: any }) => {
  const router = useRouter();

  const dashboardHref = loggedInUser
    ? loggedInUser.role?.toUpperCase() === "ADMIN"
      ? "/admin-dashboard"
      : loggedInUser.role?.toUpperCase() === "TRAINER"
        ? "/trainer-dashboard"
        : "/dashboard"
    : null;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Trainers", href: "/trainers" },
    { label: "Products", href: "/products" },
    // { label: "About Us", href: "/" },
    // { label: "Contact Us", href: "/" },
    { label: "BMI Calculator", href: "/bmi-calculator" },
    { label: "Dashboard", href: dashboardHref || "/login" },
  ];

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-tight text-foreground sm:text-2xl">
          FitSphere
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={linkClassName}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loggedInUser ? (
            <Button size="sm" variant="outline" className="hidden md:inline-flex" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button asChild size="sm" variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="md:hidden">
                <MenuIcon className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 sm:w-80">
              <SheetHeader className="border-b border-border/60 px-0 pb-4">
                <SheetTitle className="text-left text-2xl font-black tracking-tight">
                  FitSphere
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-2 pt-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="rounded-md px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;