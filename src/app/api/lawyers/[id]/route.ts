import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/db";
import { LawyerModel } from "@/models/Lawyer";
import { UserModel } from "@/models/User";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();

    // ⛔ FIX — params is a Promise, so await it
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Lawyer ID" }, { status: 400 });
    }

    // Find lawyer
    const lawyer = await LawyerModel.findById(id).lean() as any;

    if (!lawyer) {
      return NextResponse.json({ error: "Lawyer not found" }, { status: 404 });
    }

    // 👉 Fetch user details using lawyer.userId
    const user = await UserModel.findById(lawyer.userId)
      .select("name email")
      .lean();

    // 👉 Merge lawyer + user
    const finalData = {
      ...lawyer,
      user: user ? { name: user.name, email: user.email } : null,
    };

    return NextResponse.json(
      {
        success: true,
        data: finalData
      },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { error: "Server Error", details: error.message },
      { status: 500 }
    );
  }
}
