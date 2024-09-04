import { connectDB } from "@/lib/connectDB";

export const POST = async (req) => {
  try {
    const { email, bookingHistory } = await req.json();

    const db = await connectDB();
    const StudentCollection = db.collection('students');

    // Find the student by email
    const student = await StudentCollection.findOne({ email });

    if (!student) {
      return new Response(
        JSON.stringify({ message: "Student not found" }),
        { status: 404 }
      );
    }

    // Update the bookingHistory array with the new entry
    const updateResult = await StudentCollection.updateOne(
      { email },
      { $push: { bookingHistory: bookingHistory } }
    );

    console.log("Booking history updated successfully:", updateResult);

    return new Response(
      JSON.stringify({ message: "Booking history updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred during booking history update:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error }),
      { status: 500 }
    );
  }
};
