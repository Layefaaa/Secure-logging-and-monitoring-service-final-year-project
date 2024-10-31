import { Models } from "../cluster";
import { UserLogger } from "../cluster/schema.interfaces";

export class AuthLogger{
    private static instance: AuthLogger;
    private constructor() {}

    public static getInstance():AuthLogger{
        if(!AuthLogger.instance) {
            AuthLogger.instance=new AuthLogger();
        }
        return AuthLogger.instance
    }
    
    
    async forwardAuthrequest(detail:Omit< Omit<UserLogger, keyof Document>,'createdAt'>){
        const logger = new Models.UserLogger({
            email:detail.email,
            type:detail.type,
            payload:detail.payload,
            info:detail.info,
            method:detail.method,
            endpoint:detail.endpoint,
            status:detail.status,
        });
   await logger.save();

    }

    async getrequests():Promise<UserLogger[]> {
       return await Models.UserLogger.find().sort({ createdAt: -1 });
    }
}