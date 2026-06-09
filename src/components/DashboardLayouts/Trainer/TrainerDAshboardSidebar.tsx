"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarMenus = [
  { title: "Dashboard Home", path: "/trainer-dashboard" },
  { title: "Create Trainer Profile", path: "/trainer-dashboard/create-trainer-profile" },
  { title: "My Slots", path: "/trainer-dashboard/my-slots" },
  { title: "My Received Reviews", path: "/trainer-dashboard/my-received-reviews" },
  { title: "Home", path: "/" },
]

const TrainerDashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="rounded-2xl border border-border h-full bg-background p-4">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Trainer Dashboard</h2>

      {
        sidebarMenus.map((menu) => {
          const isActive = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              href={menu.path}
              className={`mb-2 block rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-2 border-primary-01 bg-primary-01 text-white"
                  : "border-2 bg-background text-foreground/80  hover:bg-primary-01 hover:text-white"
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