import envConfig from "~/config";
import { cookies } from "next/headers";
import Profile from "./profile";
export default async function AccountPage() {
  const token = cookies().get("sessionToken");
  const fetchAccount = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}account/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.log("🚀 ~ AccountPage ~ error", error);
    });

  return (
    <div>
      <h1>Account</h1>
      <div className="flex flex-col space-y-2">
        Hello {fetchAccount?.data?.email}
      </div>
      <div className="flex flex-col space-y-2">
        <Profile />
      </div>
    </div>
  );
}
