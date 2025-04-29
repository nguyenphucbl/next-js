"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import authApiRequest from "~/apiRequest/auth";
import { clientSessionToken } from "~/lib/http";

export default function LogoutPage() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    if (sessionToken === clientSessionToken.value) {
      authApiRequest
        .logoutFromNextClientToNextServer(true)
        .then((res) => {
          router.push("/login?sessionToken=logout");
        })
        .catch((err) => {
          console.error("Logout error:", err);
          router.push("/login");
        });
    }
  }, [sessionToken, router]);
  return <div>page</div>;
}
