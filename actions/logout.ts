 

import { signOut } from '@/auth';
  

export const logout = ()=> {
  try {
    signOut({ redirectTo:"/" }) 
  } catch (error) {
    console.error('Error during logout:', error);
 
  }
}
