'use client'
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const CurrentUser = () => {
  const { data: session } = useSession();

  // Use useMemo to memoize the user object
  const user = useMemo(() => session?.user, [session]);

  return user;
};
