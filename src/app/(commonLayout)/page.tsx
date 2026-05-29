import { userServices } from "@/services/user.services";

export default async function Home() {
  const session = await userServices.getSession();
  console.log("Session in Home Page", session);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
