'use client'
import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

const SessionHandler = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const expireTime = session.expires;  
      const currentTime = new Date().getTime();
      const remainingTime = new Date(expireTime).getTime() - currentTime;
 
       
      const timerId = setTimeout(() => {
        alert('Your session has expired. You will be logged out.');
        signOut();
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [session, status]);

  return null; // This component doesn't render anything
};

export default SessionHandler;
