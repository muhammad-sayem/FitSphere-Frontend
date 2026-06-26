"use client";

import { logoutAction } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

const SidebarLogoutButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logoutAction();
    await queryClient.clear();
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