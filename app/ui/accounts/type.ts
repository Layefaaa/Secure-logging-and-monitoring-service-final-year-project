import { IUser } from "@/server/cluster/schema.interfaces";

export type UserTy = Omit<IUser, 'password'> & { createdAt: string; updatedAt ?: string ,_id:string};; 
export interface EndPointCallTy{
    endpoint: string;
    statusCodes: Map<number, number>; 
}


export const statusText = {
    200: 'SUCCESS',
    400: 'BAD REQUEST',
    401: 'UNAUTHORIZED',
    403: 'ACCESS BLOCK', // or 'FORBIDDEN'
    500: 'INTERNAL SERVER ERROR',
};