import { IUser } from "@/server/cluster/schema.interfaces";

export interface AuthActivitiesTy{
    region?:string,
    email:string,
    ip?:string,
    location?:string,
    method?:string,
    endpoint?:string,
    status?:string | number,
    date?:string,
}
export type UserTy = Omit<IUser, 'password' | '_id'>;
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