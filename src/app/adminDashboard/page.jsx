'use client';
import Link from 'next/link';

export default function AdminDashboard({ loggedInUser }) {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-2">Welcome, {loggedInUser.name}!</p>
        <p className="mb-2">Role: {loggedInUser.role}</p>
        <p className="mb-2">Teacher Id: {loggedInUser.teacherId}</p>
        <div className="mt-4">
         <Link href={'/adminDashboard/registerStudent'}>
         <button
            
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 mb-4"
          >
            Register Student
          </button>
         </Link>
          <Link href={'/adminDashboard/makeAdmin'}>
          <button
            
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Make New Admin
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
