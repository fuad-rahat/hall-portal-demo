import { connectDB } from "@/lib/connectDB";
import bcrypt from 'bcrypt';

export const POST = async (req) => {
  try {
    const newStudent = await req.json();

    const db = await connectDB();

    const StudentCollection = db.collection('students');
    const exist = await StudentCollection.findOne({ email: newStudent.email });

    if (exist) {
      console.log("Student already exists with this email:", newStudent.email);
      return new Response(
        JSON.stringify({ message: "Student already in the system" }), 
        { status: 304 }
      );
    }

    const hash = bcrypt.hashSync(newStudent.password, 14);
    const insertResult = await StudentCollection.insertOne({ ...newStudent, password: hash });
    console.log("Student created successfully:", insertResult);

    return new Response(
      JSON.stringify({ message: "User Created" }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred during Student creation:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error }), 
      { status: 500 }
    );
  }
};
