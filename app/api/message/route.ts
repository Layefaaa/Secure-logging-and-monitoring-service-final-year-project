import { UserManager } from "@/server/controllers/user.service";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { id, msg } = await request.json();
    const res = await UserManager.getInstance().msgUser(id, msg);
    if (res) {
      return NextResponse.json(
       res
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error: error },
      { status: 500 }
    );
  }
}
