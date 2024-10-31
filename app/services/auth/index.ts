import { fetchUserActivities } from "./userActivities";
import { signIn } from "./signin";
import { signUp } from "./SignUp";
import { verifyAccount } from "./verifyAccount";
import { fetchApiCall } from "./apiCalls";
import { getAccounts } from "./accounts";
import { getAccount } from "./account";
import { sendNotification } from "./sendNotification";
import { controlUser } from "./controlUser";

export const AuthApi = {
  signIn,
  signUp,
  verifyAccount,
  fetchUserActivities,
  fetchApiCall,getAccounts,
  getAccount,
  sendNotification,
  controlUser
};
