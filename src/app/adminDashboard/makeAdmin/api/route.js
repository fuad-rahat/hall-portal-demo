import { connectDB } from "@/lib/connectDB";
import bcrypt from 'bcrypt';

export const POST = async (req) => {
  try {
    const newAdmin = await req.json();

    const db = await connectDB();

    const adminCollection = db.collection('admin');
    const exist = await adminCollection.findOne({ email: newAdmin.email });

    if (exist) {
      console.log("Admin already exists with this email:", newAdmin.email);
      return new Response(
        JSON.stringify({ message: "Admin already in the system" }), 
        { status: 304 }
      );
    }

    const hash = bcrypt.hashSync(newAdmin.password, 14);
    const insertResult = await adminCollection.insertOne({ ...newAdmin, password: hash });
    console.log("Admin created successfully:", insertResult);

    return new Response(
      JSON.stringify({ message: "User Created" }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred during admin creation:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error }), 
      { status: 500 }
    );
  }
};
