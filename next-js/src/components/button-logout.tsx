"use client";

import authApiRequest from "~/apiRequest/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "~/lib/utils";

export default function ButtonLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await authApiRequest.logoutFromNextClientToNextServer(true);
      console.log("🚀 ~ handleLogout ~ res:", res);
      router.push("/login");
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };
  return (
    <Button
      size={"sm"}
      variant="destructive"
      className="w-full"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
