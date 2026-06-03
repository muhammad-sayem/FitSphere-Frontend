import UserDashboardSidebar from "../User/UserDasboardSidebar";
import AdminDashboardSidebar from "../Admin/AdminDashboardSidebar";
import TrainerDashboardSidebar from "../Trainer/TrainerDashboardSidebar";
import SidebarLogoutButton from "@/components/shared/SidebarLogoutButton";

const DashboardSidebar = ({ role }: { role: string | undefined }) => {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-border/60 bg-muted/10 p-4">
      <div className="flex-1 space-y-4 overflow-y-auto">
        {role === "USER" && <UserDashboardSidebar />}

        {role === "TRAINER" && <TrainerDashboardSidebar />}

        {role === "ADMIN" && <AdminDashboardSidebar />}
      </div>

      <div className="pt-4">
        <SidebarLogoutButton />
      </div>
    </aside>
  )
};

export default DashboardSidebar;