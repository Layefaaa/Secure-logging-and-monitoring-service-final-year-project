import { RequestCounterService } from "@/server/controllers/requestCounter.service";
import { UserManager } from "@/server/controllers/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
    const endpoint = request.nextUrl.pathname
  try {
    const { email, password,ip } = await request.json();

    const user_ip = process.env.ENV === "production" ? request.ip : ip;
    const res = await UserManager.getInstance().signIn(email, password,user_ip,endpoint);
    if (res) {
      await RequestCounterService.getInstance().incrementRequestCount(request,endpoint,res.status as number)
      return NextResponse.json(
       res
      );
    }
  } catch (error) {
    await RequestCounterService.getInstance().incrementRequestCount(request,endpoint,500)
    return NextResponse.json(
      { message: "An error occurred", error: error },
      { status: 500 }
    );
  }
}
