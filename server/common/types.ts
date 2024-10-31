import { IUser } from "../cluster/schema.interfaces"

export type IResponse={
    jwt?:string,
    status:ClientResponse | string,
    msg:string
    user?:Omit<IUser,'password' | '_id'>
    info?:ClientIdentityResponse
}
export type IPassReset={
    _id:string
    new_password:string
    old_password:string
}

export interface UserRegisterTy{
    email: string;
    password: string;
    lastname:string;
    firstname: string;
    ip?:string
}

export const ClientResponseType={
    SECURED:200,
    UNAUTHORIZED:401,
    BADREQUEST:400,
    UNSECURE:403,
    SERVER_ERROR:500,
}as const
export type ClientResponse = typeof ClientResponseType[keyof typeof ClientResponseType];


export interface ClientIdentityResponse{

    status:ClientResponse
    ip?:string,
    city?:string,
    continent_name?:string,
    country_code?:string
    region?:string,
    emoji_flag?:string
    client_location?:{
        latitude:number | string
        longitude:number | string

    }
    calling_code?:number
    current_time?:number
    fraud_flag?:number
}