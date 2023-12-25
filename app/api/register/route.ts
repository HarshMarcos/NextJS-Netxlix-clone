import bcrypt from "bcrypt";
// import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: any) {
  try {
    // if (req.method !== 'POST') {
    //   return res.status(405).end();
    // }

    const { email, name, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    console.log(user);

    return NextResponse.json({
      user,
      message: "Successfully Registered",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: `Something went wrong: ${error}`,
      status: 400,
    });
  }
}
