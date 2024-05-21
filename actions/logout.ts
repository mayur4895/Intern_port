 

import { signOut } from '@/auth';
 
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await signOut({redirectTo:"/"});
    res.setHeader('Custom-Header', 'Hello from Next.js');

    // Redirect to home page
    res.redirect('/');
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
