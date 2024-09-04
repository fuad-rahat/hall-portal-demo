'use client';

import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

export default function SeatBooking() {
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [bookingHistory, setBookingHistory] = useState([]);
  const [prevSemester, setPrevSemester] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session && session.user) {
        setUserEmail(session.user.email);
  
        if (session.user.bookingHistory) {
          setBookingHistory(session.user.bookingHistory);
        }
      }
    };
  
    fetchSession();
    setCurrentSemester(getCurrentSemester());
  }, []);
  
  useEffect(() => {
    if (bookingHistory.length > 0) {
      const match = bookingHistory.find((a) => a.semester === currentSemester);
      if (match) {
        setPrevSemester(match.semester);
      }
    }
  }, [bookingHistory, currentSemester]);
  

  const getCurrentSemester = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;

    if (month >= 1 && month <= 6) {
      return `Spring ${currentDate.getFullYear()}`;
    } else {
      return `Fall ${currentDate.getFullYear()}`;
    }
  };

  
 console.log(currentSemester);
  const handlePayment = async () => {
    alert('Payment successful!');
    setIsPaymentDone(true);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    try {
      const response = await fetch('/api/SeatBooking/updateBookingHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          bookingHistory: {
            date: formattedDate,
            semester: currentSemester,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('Booking history updated successfully:', data);
    } catch (error) {
      console.error('Error updating booking history:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Seat Booking</h1>
        {!isPaymentDone ? (
          currentSemester===prevSemester ? (
            <p className="text-red-500 mt-4">Already registered for this semester</p>
          ) : (
            <button
              onClick={handlePayment}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Make Booking for Current Semester
            </button>
          )
        ) : (
          <p className="text-green-500 mt-4">Payment Successful!</p>
        )}
      </div>
    </div>
  );
}
