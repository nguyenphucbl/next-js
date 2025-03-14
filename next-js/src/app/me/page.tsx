import { cookies } from "next/headers";
import Profile from "./profile";
import accountApiRequest from "~/apiRequest/account";
export default async function AccountPage() {
  const token = cookies().get("sessionToken");
  const fetchAccount = await accountApiRequest.me(token?.value ?? "");
  console.log(
    "🚀 ~ AccountPage ~ fetchAccount:",
    fetchAccount.payload.data.email
  );

  return (
    <div>
      <h1>Account</h1>
      <div className="flex flex-col space-y-2">Hello</div>
      <div className="flex flex-col space-y-2">
        <Profile />
      </div>
    </div>
  );
}
