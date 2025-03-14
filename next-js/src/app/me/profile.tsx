"use client";

import { useEffect } from "react";
import accountApiRequest from "~/apiRequest/account";

export default function Profile() {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await accountApiRequest.meClient();
        console.log("🚀 ~ fetchProfile ~ res:", res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  return <div>profile</div>;
}
