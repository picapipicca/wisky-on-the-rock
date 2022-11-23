import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

const useUser = () => {
  const { data, error } = useSWR("/api/users/userProfile");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
};

export default useUser;
