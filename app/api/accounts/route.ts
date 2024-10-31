import { UserManager } from "@/server/controllers/user.service";
export async function GET():Promise<Response | undefined> {
try{
   const res= await UserManager.getInstance().getUsers();
   return new Response(JSON.stringify(res), { headers: { 'Content-Type': 'application/json' } });
}catch(err){
throw err;
}
}