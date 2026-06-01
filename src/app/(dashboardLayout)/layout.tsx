import DashboardNavbar from "@/components/DashboardLayouts/shared/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardLayouts/shared/DashboardSidebar";
import { userServices } from "@/services/user.services";

export default async function RootDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await userServices.getLoggedInUser();
  console.log("Logged In User in Dashboard Layout:", loggedInUser);
  const role = loggedInUser?.role;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Dashboard Sidebar */}
      <DashboardSidebar role={role} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* DashboardNavbar */}
        {/* <DashboardNavbar /> */}

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
