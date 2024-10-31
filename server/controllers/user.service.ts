import { mailServices } from "@/server/lib/gate-way/mail";
import { IUser, UserAuthInfo } from "../cluster/schema.interfaces";
import {
  ClientIdentityResponse,
  ClientResponseType,
  IPassReset,
  IResponse,
} from "@/server/common/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcryt from "bcrypt";
import { Models } from "../cluster";
import RealIdentity from "../real-indentity";
import { omit } from "../common/utils";
import { AuthLogger } from "./logger.service";
require("dotenv").config();
const ACCOUNT_ACTIVATION = process.env.ACCOUNT_ACTIVATION;
export class UserManager {
  private static instance: UserManager;

  private constructor() {}

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  async preRegisterUser(
    user: UserAuthInfo,
    endpoint: string
  ): Promise<IResponse> {
    let response: IResponse = {
      msg: "",
      status: "",
    };
    const real_time_identify_info = await RealIdentity.get(
      user.ip
    ).clientAuthInfo();

    response = {
      msg: "",
      status: real_time_identify_info.status,
      info: real_time_identify_info,
    };

    const { firstname, lastname, email, password } = user;
    if (real_time_identify_info.status !== ClientResponseType.SECURED) {
      response.msg = "Access restriction";
      await AuthLogger.getInstance().forwardAuthrequest({
        email,
        method: "POST",
        endpoint,
        payload: undefined,
        status: real_time_identify_info.status,
        type: "Register",
        info: real_time_identify_info,
      });
      return response;
    }

    const check_user = await Models.User.findOne({ email: email });
    if (check_user) {
      response.msg = "Account registered already!";
      response.status = 401;
      return response;
    }
    if (!ACCOUNT_ACTIVATION) {
      return response;
    }

    const signtoken = jwt.sign(
      { firstname, lastname, email, password },
      ACCOUNT_ACTIVATION,
      { expiresIn: "1d" }
    );
    try {
      await mailServices.registerUser(firstname, email, signtoken);
      response.msg =
        "Registration successful, please check your email for activation link";
      response.status = 200;

      await AuthLogger.getInstance().forwardAuthrequest({
        email,
        method: "POST",
        endpoint,
        payload: undefined,
        status: response.status,
        type: "Register",
        info: real_time_identify_info,
      });
    } catch (error) {
      response.status = 400;
   
    }

    return response;
  }

  async authenticateUser(
    token: string,
    ipAddress: string,
    endpoint: string
  ): Promise<IResponse> {
    let response: IResponse = {
      msg: "",
      status: "",
    };

    let userEmail: string = "";
    try {
      const clientAuthInfo = await RealIdentity.get(ipAddress).clientAuthInfo();
      response = {
        msg: "",
        status: clientAuthInfo.status,
        info: clientAuthInfo,
      };

      if (!ACCOUNT_ACTIVATION) {
        return response;
      }

      const decodedToken = jwt.verify(token, ACCOUNT_ACTIVATION) as JwtPayload;
      const { firstname, lastname, email, password } = decodedToken;
      userEmail = email;

      if (clientAuthInfo.status !== ClientResponseType.SECURED) {
        response.msg="Access restricted"
        response.status=clientAuthInfo.status
        await AuthLogger.getInstance().forwardAuthrequest({
          email: userEmail,
          method: "GET",
          endpoint,
          payload: undefined,
          status: response.status as number,
          type: "Verify Account",
          info: response.info,
        });
        return response
      }

      const existingUser = await Models.User.findOne({ email });
      if (existingUser) {
          response.msg="Email already verified or registered!";
          response.status= ClientResponseType.BADREQUEST;
          await AuthLogger.getInstance().forwardAuthrequest({
            email: userEmail,
            method: "GET",
            endpoint,
            payload: undefined,
            status: response.status as number,
            type: "Verify Account",
            info: response.info,
          });
          return response
        };
    
      const newUser = new Models.User({
        password,
        email,
        firstname,
        lastname,
        flags: 0,
        active: true,
        info: clientAuthInfo,
      });

      const savedUser = await newUser.save();
      const jwtToken = savedUser.generateToken();
        response.msg= "Account verified, enjoy!";
        response.status= ClientResponseType.SECURED;
        response.jwt= jwtToken;
        response.user= omit(savedUser.toObject(), ["password", "_id"]);
      
    } catch (error) {
      response.msg = "Authentication error";
      response.status = ClientResponseType.UNAUTHORIZED;

      await AuthLogger.getInstance().forwardAuthrequest({
        email: userEmail,
        method: "GET",
        endpoint,
        payload: undefined,
        status: response.status as number,
        type: "Verify Account",
        info: response.info,
      });
  
      return response;
    }

    await AuthLogger.getInstance().forwardAuthrequest({
      email: userEmail,
      method: "GET",
      endpoint,
      payload: undefined,
      status: response.status as number,
      type: "Verify Account",
      info: response.info,
    });

    return response;
  }

  async getUsers(): Promise<Omit<IUser,'password' >[]> {
    let response: Omit<IUser,'password'>[] = [];
    try {
      const allusers = await Models.User.find({}).select('-password').sort({ createdAt: "desc" });
      if (allusers) {
        response = allusers;
      }
    } catch (error) {
      console.error(error);
    }
    return response;
  }

  async getUser(_id:string): Promise<Omit<IUser,'password' > | undefined> {
    let response: Omit<IUser,'password'> | undefined ;
    try {
      const user = await Models.User.findById(_id).select('-password').sort({ createdAt: "desc" });
      if (user) {
        response =user;
      }
    } catch (error) {
      console.error(error);
    }
    return response;
  }
  async signIn(
    email: string,
    passsword: string,
    ipAddress: string,
    endpoint:string
  ): Promise<IResponse | undefined> {
    let response: IResponse = {
      msg: "",
      status: "",
    };
    try {
      const user_ac = await Models.User.findOne({ email: email });
      const clientAuthInfo = await RealIdentity.get(ipAddress).clientAuthInfo();
      response = {
        msg: "",
        status: clientAuthInfo.status,
        info: clientAuthInfo,
      };

      if (clientAuthInfo.status !== ClientResponseType.SECURED) {

        await AuthLogger.getInstance().forwardAuthrequest({
          email,
         method:"POST",
         endpoint,
          payload: undefined,
          status: response.status as number,
          type: "Sign In",
          info: response.info,
        });
        response.msg = "Access restriction";
        return response;
      }
    
      if (user_ac) {
  
        if (!user_ac.active) {
          response.status = ClientResponseType.UNAUTHORIZED;
          console.error("User is not active");
        }
        if (user_ac.active) {
          const matchpassword = await user_ac.comparePassword(passsword);
          if (matchpassword == true) {
          await Models.User.findByIdAndUpdate(
              { _id: user_ac._id },
              {
                $set: {
                  info: clientAuthInfo,
                },
              },
              { new: true }
            );

            const token = user_ac.generateToken();
        
            response.user=user_ac;
            response.jwt= token as string;
            response.status=ClientResponseType.SECURED;
            response.msg= "User authenticated successfully";
         
            await AuthLogger.getInstance().forwardAuthrequest({
              email,
             method:"POST",
             endpoint,
              payload: undefined,
              status: response.status as number,
              type: "Sign In",
              info: response.info,
            });
            return response
          }
          if (matchpassword == false) {
              response.status= ClientResponseType.UNAUTHORIZED;
              response.msg= "User authentication failed";
              await AuthLogger.getInstance().forwardAuthrequest({
                email,
               method:"POST",
               endpoint,
                payload: undefined,
                status: response.status as number,
                type: "Sign In",
                info: response.info,
              });
            return response;
          }
        }
      }

      if (!user_ac) {
        response.status=  ClientResponseType.BADREQUEST;
        response.msg= "Account not found";
        await AuthLogger.getInstance().forwardAuthrequest({
          email,
         method:"POST",
         endpoint,
         payload: undefined,
          status: response.status as number,
          type: "Sign In",
          info: response.info,
        });
        return response;
      }
    } catch (error) {
      
   
      response.status=  ClientResponseType.SERVER_ERROR;
      response.msg= `error: ${error}`;
      await AuthLogger.getInstance().forwardAuthrequest({
        email,
       method:"POST",
       endpoint,
        payload: undefined,
        status: response.status as number,
        type: "Sign In",
        info: response.info,
      });
      return response
    }
    await AuthLogger.getInstance().forwardAuthrequest({
      email,
     method:"POST",
     endpoint,
      payload: undefined,
      status: response.status as number,
      type: "Sign In",
      info: response.info,
    });
    return response;
  }

  async signInwIthNextAuth({email,payload,ipAddress}:{
    email: string,
    payload?:{
      firstname:string,
      lastname:string,
      email?:string,
      image?:string
    },
    ipAddress?: string,}
  ): Promise<IResponse | undefined> {
    let response: IResponse = {
      msg: "",
      status: "",
    };

    try {
      let clientAuthInfo: ClientIdentityResponse;
      if(ipAddress){
        clientAuthInfo = await RealIdentity.get(ipAddress).clientAuthInfo();
        response = {
          msg: "",
          status: clientAuthInfo.status,
          info: clientAuthInfo,
        };
  
        if (clientAuthInfo.status !== ClientResponseType.SECURED) {
          await AuthLogger.getInstance().forwardAuthrequest({
            email,
           method:"POST",
           endpoint:"next/auth",
            payload: undefined,
            status: response.status as number,
            type: "Sign In",
            info: response.info,
          });
          response.msg = "Access restriction";
          return response;
        }
  
  
  
      }
  

      const user_ac = await Models.User.findOneAndUpdate({email: email},


        
      {
...payload,

$set: {
  // info: clientAuthInfo,
},

      },
      {new: true, upsert: true})
      // const clientAuthInfo = await RealIdentity.get(ipAddress).clientAuthInfo();
      // response = {
      //   msg: "",
      //   status: clientAuthInfo.status,
      //   info: clientAuthInfo,
      // };

      // if (clientAuthInfo.status !== ClientResponseType.SECURED) {
      //   await AuthLogger.getInstance().forwardAuthrequest({
      //     email,
      //    method:"POST",
      //    endpoint,
      //     payload: undefined,
      //     status: response.status as number,
      //     type: "Sign In",
      //     info: response.info,
      //   });
      //   response.msg = "Access restriction";
      //   return response;
      // }

      if (user_ac) {
        if (!user_ac.active) {
          response.status = ClientResponseType.UNAUTHORIZED;
          console.error("User is not active");
        }
      }

    } catch (error) {
      
      response.status=  ClientResponseType.SERVER_ERROR;
      response.msg= `error: ${error}`;
      await AuthLogger.getInstance().forwardAuthrequest({
        email,
       method:"POST",
       endpoint:'next/auth',
        payload: undefined,
        status: response.status as number,
        type: "Sign In",
        info: response.info,
      });
      return response
    }
    await AuthLogger.getInstance().forwardAuthrequest({
      email,
     method:"POST",
     endpoint:'next/auth',
      payload: undefined,
      status: response.status as number,
      type: "Sign In",
      info: response.info,
    });
    return response;
  }

  async updateUserInfo(_id: string, data: any): Promise<IResponse> {
    let res: IResponse = { status: ClientResponseType.SECURED, msg: "" };
    try {
      const updated_user = await Models.User.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            ...data,
          },
        },
        { new: true }
      );
      if (!updated_user) {
        return res;
      }
      res = {
        user: updated_user,
        status: ClientResponseType.SECURED,
        msg: "User updated successfully",
      };
    } catch (error) {
      res = {
        status: ClientResponseType.SECURED,
        msg: "erorr",
      };

      console.log(error);
    }
    return res;
  }


  async UserAccess(_id: string): Promise<IResponse> {
    let res: IResponse = { status: ClientResponseType.SECURED, msg: "" };

    try {
      const user= await Models.User.findById({_id});
      if(user){
        const action=user.active ? false : true;
        const _user = await Models.User.findOneAndUpdate(
          { _id: _id },
          {
            $set: {
              active: action,
            },
          },
          { new: true }
        );
  
        res = {
          status: ClientResponseType.SECURED,
          msg: "Action successfull",
        };
        const userName=user.firstname + ' '+ user.lastname
        await mailServices.toggleUserAccountStatus(userName,user.email,user.active!);
        console.log({ updated: _user });
      }
 
    } catch (error) {
      res = { status: ClientResponseType.SERVER_ERROR, msg: "error" };
      console.log(error);
    }
    return res;
  }

  async msgUser(_id: string,msg:string): Promise<IResponse> {
    let res: IResponse = { status: ClientResponseType.SECURED, msg: "" };

    try {
      const user= await Models.User.findById({_id});
      if(user){
        const userName=user.firstname + ' '+ user.lastname
        await mailServices.sendUserMail(userName,user.email,msg);
      }
 

      res = {
        status: ClientResponseType.SECURED,
        msg: "Action successfull",
      };
    } catch (error) {
      res = { status: ClientResponseType.SERVER_ERROR, msg: "error" };
      console.log(error);
    }
    return res;
  }

  // async passwordReset({
  //   _id,
  //   new_password,
  //   old_password,
  // }: IPassReset): Promise<IResponse> {
  //   let res: IResponse = { status: ClientResponseType.SECURED, msg: "error" };
  //   try {
  //     const user_a = await Models.User.findById({ _id });
  //     if (user_a) {
  //       const matchpassword = await user_a.comparePassword(old_password);
  //       if (matchpassword == false) {
  //         res = { status: "400", msg: "Not Permitted ,password mismatch" };
  //         console.log("Not Permitted");
  //       }
  //       if (matchpassword == true) {
  //         const salt = await bcryt.genSalt(10);
  //         const hash = await bcryt.hash(new_password, salt);
  //         const _userUpdate = await Models.User.findOneAndUpdate(
  //           { _id },
  //           {
  //             $set: {
  //               password: hash,
  //             },
  //           },
  //           { new: true }
  //         );

  //         if (!_userUpdate) {
  //           return res;
  //         }
  //         res = {
  //           status: ClientResponseType.SECURED,
  //           msg: "updated successfully",
  //           user: _userUpdate,
  //         };
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res = { status: ClientResponseType.SECURED, msg: "error" };
  //   }
  //   return res;
  // }
  // async passForgotLink(email: string): Promise<IResponse> {
  //   let res: IResponse = {
  //     status: ClientResponseType.SECURED,
  //     msg: "error",
  //   };
  //   try {
  //     const check_user = await Models.User.findOne({ email: email });
  //     if (!ACCOUNT_ACTIVATION) {
  //       return res;
  //     }
  //     if (check_user) {
  //       const _id = check_user._id;

  //       const token = jwt.sign({ _id }, ACCOUNT_ACTIVATION, {
  //         expiresIn: "1d",
  //       });
  //       await GateWAY.ResetPass(email, token);
  //       res = {
  //         msg: "Please check your email",
  //         status: ClientResponseType.SECURED,
  //       };
  //     }
  //     if (!check_user) {
  //       res = {
  //         msg: "Account not found",
  //         status: ClientResponseType.SECURED,
  //       };
  //     }
  //   } catch (error) {
  //     res = {
  //       msg: "Error",
  //       status: ClientResponseType.SECURED,
  //     };
  //   }

  //   return res;
  // }
}
