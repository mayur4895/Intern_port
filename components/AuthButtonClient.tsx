// components/AuthButtonClient.tsx
 

import { signOut } from "@/auth";
import { useRouter } from "next/navigation";

 
const AuthButtonClient = () => {
 
  const handleSignOut = async () => {
    signOut({redirectTo:"/auth/login"})
 
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      type="button"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default AuthButtonClient;
