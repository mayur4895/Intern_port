// [your-nextjs-project]/components/AutoLogout.js
'use client'
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const AutoLogout = () => {
  const { data: session } = useSession();
 
  useEffect(() => {
    if (session) {
      const sessionExpiryTime = new Date(session.expires).getTime();
      const currentTime = new Date().getTime();
      const timeLeft = sessionExpiryTime - currentTime;

      if (timeLeft <= 0) {
        signOut();
      } else {
        const timeoutId = setTimeout(() => {
          signOut();
        }, timeLeft);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [session]);

  return null;
};

export default AutoLogout;
