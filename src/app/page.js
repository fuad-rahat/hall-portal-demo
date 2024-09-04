'use client';

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import Link from 'next/link';
import AdminDashboard from './adminDashboard/page';

const getCurrentSemester = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;

  if (month >= 1 && month <= 6) {
    return `Spring ${currentDate.getFullYear()}`;
  } else {
    return `Fall ${currentDate.getFullYear()}`;
  }
};

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('');
  const [openedSemester, setOpenedSemester] = useState(''); 

  useEffect(() => {
    const currentSemester = getCurrentSemester();
    setOpenedSemester(currentSemester);

    const checkSession = async () => {
      const session = await getSession(); 
      if (session && session.user) {
        setLoggedInUser(session.user); 
        setUserType(session.user.userType); 
        setError('');
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = e.target;
    const email = body.email.value;
    const password = body.password.value; 

    const res = await signIn("credentials", {
      email,
      password, 
      redirect: false,
    });
     if(res.status===200)
     {
      
     }
    if (res?.error) {
      setError('Invalid email or password');
      setLoggedInUser(null);
      setUserType('');
    } else {
      const session = await getSession(); 
      if (session && session.user) {
        setLoggedInUser(session.user); 
        setUserType(session.user.userType); 
        setError('');
      }
    }
  };

  return (
    <>
      <main className="flex justify-center h-[90vh] items-center  bg-gray-100">
        {!loggedInUser ? (
          <div className=" w-[30rem] h-[20rem] p-4 bg-white rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </form>
          </div>
        ) : userType === 'student' ? (
          <div className="p-6  bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Welcome, {loggedInUser.name}!</h2>
            <p className="mb-2">Student ID: {loggedInUser.studentId}</p>
            <p className="mb-2">Room No: {loggedInUser.roomNo}</p>
            <div className="mt-6">
              <div className=''>
              <Link className='' href={'/SeatBooking'}>
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Seat Booking
                </button>
              </Link>
              <Link href={'/booking-history'}>
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 mt-4">
                  Booking History
                </button>
              </Link>
              </div>
              <Link href={'/cancel-seat'}>
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 mt-4">
                  Cancel Seat
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className=" bg-white rounded shadow-md">
            <AdminDashboard loggedInUser={loggedInUser} />
          </div>
        )}
      </main>
    </>
  );
}
