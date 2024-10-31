import { UserManager } from "@/server/controllers/user.service";
import { NextRequest } from "next/server";
export async function GET(req:NextRequest):Promise<Response | undefined> {
    const { searchParams } = req.nextUrl

    const _id  = searchParams.get("id")
try{
    if(_id){
        const res= await UserManager.getInstance().getUser(_id);
        return new Response(JSON.stringify(res), { headers: { 'Content-Type': 'application/json' } });
    }{
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

}catch(err){
throw err;
}
}