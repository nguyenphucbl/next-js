"use client";

import { useEffect } from "react";
import { useAppContext } from "../appProvider";
import envConfig from "~/config";

export default function Profile() {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}account/me`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [sessionToken]);
  return <div>profile</div>;
}
