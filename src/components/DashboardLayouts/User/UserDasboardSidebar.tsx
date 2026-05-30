"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarMenus = [
  { title: "Dashboard Home", path: "/dashboard" },
  { title: "My Bookings", path: "/dashboard/my-bookings" },
  { title: "My Orders", path: "/dashboard/my-orders" },
  { title: "My Payments", path: "/dashboard/my-payments" },
  { title: "My reviews", path: "/dashboard/my-reviews" },
  { title: "Home", path: "/" },
]

const UserDashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="rounded-2xl border border-border/60 h-full bg-background p-4">
      <h2 className="mb-4 text-lg font-semibold text-foreground">User Dashboard</h2>

      {
        sidebarMenus.map((menu) => {
          const isActive = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              href={menu.path}
              className={`mb-2 block rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary-01 bg-primary-02 text-foreground"
                  : "border-border/60 bg-background text-foreground/80 hover:border-primary-01 hover:bg-primary-02/40 hover:text-foreground"
              }`}
            >
              {menu.title}
            </Link>
          )
        })
      }
    </div>

  );
};

export default UserDashboardSidebar;