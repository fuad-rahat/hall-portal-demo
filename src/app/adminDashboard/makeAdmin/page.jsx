"use client";
export default function MakeAdmin() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = e.target;
    const adminData = {
      name: body.name.value,
      teacherId: body.teacherId.value,
      role: 'admin',
      email: body.email.value,
      password: body.password.value
    };

    try {
      const response = await fetch('/adminDashboard/makeAdmin/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      const responseData = await response.json();
      console.log('Response Data:', responseData);

      if (response.ok) {
        alert('Admin created successfully!');
        body.reset();
      } else {
        console.log('Failed to create admin: ', responseData);
        alert(`Failed to create admin: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the admin');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Make New Admin</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input type="text" name="name" className="mt-1 w-full px-3 py-2 border rounded" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Teacher Id</label>
            <input type="text" name="teacherId" className="mt-1 w-full px-3 py-2 border rounded" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input type="text" name="password" className="mt-1 w-full px-3 py-2 border rounded" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" className="mt-1 w-full px-3 py-2 border rounded" required />
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
