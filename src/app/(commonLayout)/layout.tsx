import Navbar from "@/components/shared/Navbar";
import { userServices } from "@/services/user.services";

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await userServices.getLoggedInUser();

  return (
    <div>
      <Navbar loggedInUser={loggedInUser} />
      <div className="mx-auto">
        {children}
      </div>
    </div>
  );
}
