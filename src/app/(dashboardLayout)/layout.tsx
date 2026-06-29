import { Suspense } from "react";
import DashboardSidebar from "@/components/DashboardLayouts/shared/DashboardSidebar";
import MobileMenu from "@/components/DashboardLayouts/shared/MobileMenu";
import { userServices } from "@/services/user.services";

//* Layout async reads (e.g. getLoggedInUser) must run inside a Suspense
//  boundary, otherwise React's streaming reconciler throws:
//  "We are cleaning up async info that was not on the parent Suspense boundary."
//  Loading.tsx in this segment only wraps page Suspense, not layouts. *//
async function DashboardChrome({ children }: { children: React.ReactNode }) {
  const loggedInUser = await userServices.getLoggedInUser();
  console.log("Logged In User in Dashboard Layout:", loggedInUser);
  const role = loggedInUser?.role;

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile viewports */}
      <div className="hidden lg:block h-full shrink-0">
        <DashboardSidebar role={role} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden w-full">
        {/* Mobile Interactive Header Navigation */}
        <MobileMenu role={role} />

        {/* Dashboard Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 w-full">
          <div className="max-w-400 mx-auto w-full">{children}</div>
        </main>
      </div>
    </>
  );
}

export default function RootDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden w-full bg-gray-50/20">
      <Suspense fallback={null}>
        <DashboardChrome>{children}</DashboardChrome>
      </Suspense>
    </div>
  );
}