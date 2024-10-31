import { clientIp } from "@/app/lib/getClientIp";
import { UserManager } from "@/server/controllers/user.service";
import { IUser } from "@/server/cluster/schema.interfaces";
require("dotenv").config();
import { NextRequest, NextResponse } from "next/server";
import { RequestCounterService } from "@/server/controllers/requestCounter.service";
export async function GET(request: NextRequest) {
  const endpoint = request.nextUrl.pathname
  try {
    const { searchParams } = request.nextUrl

    const token  = searchParams.get("t")

    const ip = process.env.ENV==="production" ?request.ip :searchParams.get("ip")
  if(ip===null)return
      const res= await UserManager.getInstance().authenticateUser(token??'',ip??'',endpoint)   
      await RequestCounterService.getInstance().incrementRequestCount(request,endpoint,res.status as number) 
      return NextResponse.json(
        res
      );

  } catch (error) {
    await RequestCounterService.getInstance().incrementRequestCount(request,endpoint,500)
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
