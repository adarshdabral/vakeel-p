import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  console.log("📩 [POST] /api/auth/register called");

  try {
    const body = await request.json().catch((err) => {
      console.error("❌ register: body parse error:", err);
      throw new Error("Invalid JSON body");
    });

    console.log("📥 register body:", {
      name: body?.name,
      email: body?.email,
      passwordProvided: Boolean(body?.password),
      role: body?.role,
    });

    const { name, email, password, role = "client", city, category } = body;

    // Input validation
    if (!name || !email || !password) {
      console.warn("⚠️ register: validation failed", { name, email, password: Boolean(password) });
      return NextResponse.json(
        {
          message: "Validation failed.",
          error: "Name, email, and password are required.",
          received: { name, email, password: Boolean(password) },
        },
        { status: 400 }
      );
    }

    // DB connection
    try {
      await connectToDatabase();
      console.log("✅ register: DB connection OK");
    } catch (dbError: any) {
      console.error("❌ register: Database connection error:", dbError);
      return NextResponse.json(
        {
          message: "Failed to connect to the database.",
          error: dbError?.message || String(dbError),
        },
        { status: 500 }
      );
    }

    // Check if user exists
    try {
      const lookupEmail = String(email).toLowerCase();
      console.log("🔍 register: checking existing user for", lookupEmail);
      const existingUser = await UserModel.findOne({ email: lookupEmail }).lean().exec();

      if (existingUser) {
        console.warn("⚠️ register: duplicate email:", lookupEmail);
        return NextResponse.json(
          {
            message: "Duplicate email.",
            error: "An account with this email already exists.",
          },
          { status: 409 }
        );
      }
    } catch (lookupError: any) {
      console.error("❌ register: User lookup error:", lookupError);
      return NextResponse.json(
        {
          message: "Failed to check for existing user.",
          error: lookupError?.message || String(lookupError),
        },
        { status: 500 }
      );
    }

    // Password hashing
    let hashed: string;
    try {
      console.log("🔐 register: hashing password");
      hashed = await hashPassword(password);
      console.log("🔐 register: password hashed");
    } catch (hashError: any) {
      console.error("❌ register: Password hashing error:", hashError);
      return NextResponse.json(
        {
          message: "Password hashing failed.",
          error: hashError?.message || String(hashError),
        },
        { status: 500 }
      );
    }

    // Creating user
    let user;
    try {
      console.log("🛠 register: creating user", { name, email });
      user = await UserModel.create({
        name,
        email,
        password: hashed,
        role,
        city,
        category,
      });
      console.log("✅ register: user created", user?.id ?? user?._id);
    } catch (createError: any) {
      console.error("❌ register: User creation error:", createError);

      // Detect duplicate key at DB level (race condition)
      if (createError?.code === 11000) {
        return NextResponse.json(
          {
            message: "Duplicate email (race condition).",
            error: createError?.message || "Duplicate key error",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          message: "Failed to create user.",
          error: createError?.message || String(createError),
          stack: process.env.NODE_ENV !== "production" ? createError?.stack : undefined,
        },
        { status: 500 }
      );
    }

    // Success
    try {
      const safeUser = typeof user?.toJSON === "function" ? user.toJSON() : user;
      return NextResponse.json(
        {
          user: safeUser,
          message: "Registration successful.",
        },
        { status: 201 }
      );
    } catch (toJSONError: any) {
      console.warn("⚠️ register: toJSON error, returning raw user:", toJSONError);
      return NextResponse.json({ user, message: "Registration successful." }, { status: 201 });
    }
  } catch (error: any) {
    console.error("🔥 register: Unexpected server error:", error);
    return NextResponse.json(
      {
        message: "Unexpected server error.",
        error: error?.message || String(error),
        stack: process.env.NODE_ENV !== "production" ? error?.stack : undefined,
      },
      { status: 500 }
    );
  }
}
