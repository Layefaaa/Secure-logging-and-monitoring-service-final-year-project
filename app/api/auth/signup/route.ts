import { UserManager } from "@/server/controllers/user.service";
import { UserAuthInfo } from "@/server/cluster/schema.interfaces";
import { NextRequest, NextResponse } from "next/server";
import { RequestCounterService } from "@/server/controllers/requestCounter.service";

export async function POST(request: NextRequest) {
  const endpoint = request.nextUrl.pathname
  
  try {
    const { lastname, firstname, email, password, ip }: UserAuthInfo =
      await request.json();
  
    
    const user_ip = process.env.ENV === "production" ? request.ip : ip;
    const userDetails = { lastname, firstname, email, password, ip: user_ip! };
    const res = await UserManager.getInstance().preRegisterUser(userDetails,endpoint);
    await RequestCounterService.getInstance().incrementRequestCount(request,endpoint,res.status as number)
    return NextResponse.json(res);

  } catch (error:unknown) {
    console.log({ error });
 
    await RequestCounterService.getInstance().incrementRequestCount(request,endpoint,500)
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
