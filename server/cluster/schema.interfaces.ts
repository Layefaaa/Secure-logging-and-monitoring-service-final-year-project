import { Model } from "mongoose";
import { ClientIdentityResponse } from "../common/types";

export interface IUser extends  Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  image?: string;
  info?:ClientIdentityResponse
  active?: boolean;
  flags:number,
  comparePassword(pass: string): Promise<boolean>;
  generateToken(): string;
}

export interface UserModel extends Model<IUser> {}
export interface UserAuthInfo {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  ip:string
}



// logger 

export interface UserLogger extends  Document {
  createdAt(createdAt: any): unknown;
  email: string;
  info?:ClientIdentityResponse
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  endpoint: string
  payload:any,
  type?: string,
  status?:number
}

export interface LoggerModel extends Model<UserLogger> {}

// request logger


export interface IStatusCodeCounter extends Document {
  endpoint: string;
  statusCodes: Map<number, number>; // The keys are status codes and values are counts
  lastReset: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RequestModelTy extends Model<IStatusCodeCounter> {}
