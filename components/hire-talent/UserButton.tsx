 import React from 'react'
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
 
 const UserButton = () => {
   return (
     <div>
        <div className="flex flex-col    items-start  justify-start gap-4">
                        <Button
                          type="submit" 
                          className=" font-normal"
                          onClick={() => {
                            signOut();
                          }}>
                          Logout
                        </Button>
                      </div>
     </div>
   )
 }
 
 export default UserButton
 