"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarMenus = [
  { title: "Dashboard Home", path: "/trainer-dashboard" },
  { title: "Create Trainer Profile", path: "/trainer-dashboard/create-trainer-profile" },
  { title: "My Slots", path: "/trainer-dashboard/my-slots" },
  { title: "My Orders", path: "/trainer-dashboard/my-orders" },
  { title: "My Payments", path: "/trainer-dashboard/my-payments" },
  { title: "My reviews", path: "/trainer-dashboard/my-reviews" },
  { title: "Home", path: "/" },
]

const TrainerDashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="rounded-2xl border border-border/60 h-full bg-background p-4">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Trainer Dashboard</h2>

      {
        sidebarMenus.map((menu) => {
          const isActive = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              href={menu.path}
              className={`mb-2 block rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${isActive
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

export default TrainerDashboardSidebar;