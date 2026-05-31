"use client";

import { logoutAction } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SidebarLogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
  };
  return (
    <div>
      <Button variant="outline" className="w-full" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default SidebarLogoutButton;