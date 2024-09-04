'use client';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session && session.user) {
        setUser(session.user);
        if (session.user.bookingHistory) {
          setHistory(session.user.bookingHistory);
        }
      }
    };

    fetchSession();
  }, []);
  console.log(history);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Booking History</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Semester</th>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Seat Number</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((booking, index) => (
             <tr key={index}>
             <td className="border px-4 py-2">{user.name}</td>
             <td className="border px-4 py-2">{booking.semester}</td>
             <td className="border px-4 py-2">{user.studentId}</td>
             <td className="border px-4 py-2">{user.roomNo}</td>
             <td className="border px-4 py-2">{user.semester}</td>
             <td className="border px-4 py-2">{booking.date}</td>
           </tr>
              ) 
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
