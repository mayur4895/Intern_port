'use client'
import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useToast } from '../ui/use-toast';

const SessionHandler = () => {
  const { data: session, status } = useSession();
 const {toast} = useToast();
  useEffect(() => {
    if (status === 'authenticated' && session) {
      const expireTime = session.expires;  
      const currentTime = new Date().getTime();
      const remainingTime = new Date(expireTime).getTime() - currentTime;
 
       
      const timerId = setTimeout(() => {
       toast({
        title:"Your session has expired Please Login Again."
       })
        signOut();
      }, remainingTime);

      return () => clearTimeout(timerId);
    }
  }, [session, status]);

  return null; // This component doesn't render anything
};

export default SessionHandler;
