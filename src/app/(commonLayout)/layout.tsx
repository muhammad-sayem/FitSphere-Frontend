import { Suspense } from "react";
import Navbar from "@/components/shared/Navbar";
import { userServices } from "@/services/user.services";

//* Async work inside an RSC layout must be wrapped in <Suspense> to avoid
//  React's "cleaning up async info that was not on the parent Suspense
//  boundary" warning when streaming. *//
async function CommonChrome({ children }: { children: React.ReactNode }) {
  const loggedInUser = await userServices.getLoggedInUser();

  return (
    <div>
      <Navbar loggedInUser={loggedInUser} />
      <div className="mx-auto">{children}</div>
    </div>
  );
}

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      {/* @ts-expect-error Async Server Component */}
      <CommonChrome>{children}</CommonChrome>
    </Suspense>
  );
}
