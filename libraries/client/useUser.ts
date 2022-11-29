import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { User } from "@prisma/client";

interface UserResponseProps {
  ok: boolean;
  profile: User;
}
const useUser = () => {
  const { data, error } = useSWR<UserResponseProps>("/api/users/profile");
  const router = useRouter();
  const NotEnterPage = router.pathname !== "/enter";

  useEffect(() => {
    if (data && !data.ok && NotEnterPage) {
      router.replace("/enter");
    }
  }, [data, router,NotEnterPage]);

  return { user: data?.profile, isLoading: !data && !error };
};

export default useUser;
