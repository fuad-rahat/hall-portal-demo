// components/Navbar.js

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation
import { signOut } from 'next-auth/react'; // Import signOut from next-auth/react
import Link from 'next/link';

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter(); // Initialize the router for navigation

  useEffect(() => {
    const fetchSession = async () => {
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      
      if (session && session.user) {
        setLoggedInUser(session.user); 
      }
    };
    
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false }); 
    router.push('/'); 
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'}><div className="text-white text-xl font-bold">My Application</div></Link>
        <div>
          
        </div>
        <div className="space-x-4">
          {loggedInUser ? (
            <>
              <span className="text-white">Welcome, {loggedInUser.name}!</span>
              <button
                onClick={handleLogout}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Log Out
              </button>
            </>
          ) : (
            <span className="text-white">Please log in</span>
          )}
        </div>
      </div>
    </nav>
  );
}
