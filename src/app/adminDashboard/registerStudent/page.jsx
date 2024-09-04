'use client';

export default function RegisterStudent() {
  
  const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body=e.target;
    const studentData={
      name:body.name.value,
      studentId:body.studentId.value,
      semester:body.semester.value,
      roomNo:body.roomNo.value,
      email:body.email.value,
      password:body.password.value,
      bookingHistory:[{semester:body.semester.value,date:formattedDate}]
    }

    try {
      const response = await fetch('/adminDashboard/registerStudent/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        alert('Student registered successfully!');
        // Clear the form
        body.reset();
      } else {
        alert('Failed to register student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the student');
    }
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Register Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">studentId</label>
            <input
              type="text"
              name="studentId"
             
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Semester</label>
            <input
              type="text"
              name="semester"
              
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Room No</label>
            <input
              type="text"
              name="roomNo"
              
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              
              className="mt-1 w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
