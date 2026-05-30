import UserDashboardSidebar from "../User/UserDasboardSidebar";
import TrainerDashboardSidebar from "../Trainer/TrainerDAshboardSidebar";
import AdminDashboardSidebar from "../Admin/AdminDashboardSidebar";

const DashboardSidebar = ({ role }: { role: string }) => {
  return (
    <aside className="h-full w-72 border-r border-border/60 bg-muted/10 p-4">

      {role === "USER" && <UserDashboardSidebar />}

      {role === "TRAINER" && <TrainerDashboardSidebar />}

      {role === "ADMIN" && <AdminDashboardSidebar />}
    </aside>
  );
};

export default DashboardSidebar;