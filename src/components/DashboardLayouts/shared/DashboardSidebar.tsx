import UserDashboardSidebar from "../User/UserDasboardSidebar";
import AdminDashboardSidebar from "../Admin/AdminDashboardSidebar";
import TrainerDashboardSidebar from "../Trainer/TrainerDashboardSidebar";


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