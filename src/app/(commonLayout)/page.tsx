import { userServices } from "@/services/user.services";

export default async function Home() {
  const session = await userServices.getSession();
  console.log("Session Data:", session.data);

  // const access_token = session.data?.access_token;
  // console.log("Access Token:", access_token);

  const user = await userServices.getLoggedInUser();
  console.log("Logged In User:", user);

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-base-color-01">Hello world!</h1>
    </div>
  );
}
