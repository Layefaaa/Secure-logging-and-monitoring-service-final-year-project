import { Connection, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcryt from "bcrypt";
import { IUser, UserModel } from "@/server/cluster/schema.interfaces";
require("dotenv").config();




const DEFAULT_TOKEN_SECRET="adscxhjsahd21k43we8sfdogkdlk"
const DB_SCHEMA_NAME = "users";



const userSchema: Schema<IUser> = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    image: { type: String, required: false },
    flags:String,
    info: {
      status: { type: String, required: true },
      ip: { type: String, required: false },
      city: { type: String, required: false },
      continent_name: { type: String, required: false },
      country_code: { type: String, required: false },
      region: { type: String, required: true },
      emoji_flag: { type: String, required: false },
      client_location: {
        latitude: { type: Schema.Types.Mixed, required: false },
        longitude: { type: Schema.Types.Mixed, required: false },
      },
      calling_code: { type: Number, required: false },
      current_time: { type: String, required: false },
      fraud_flag: { type: Number, required: false },
    },
    active:Boolean
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcryt.genSalt(10);
    const hash = await bcryt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});
const JWT_SECRET=process.env.DB_SECRET?? DEFAULT_TOKEN_SECRET

userSchema.methods.comparePassword = async function (pass: string) {
  const user = this;
  return await bcryt.compare(pass, user.password);
};

userSchema.methods.generateToken = function () {
  const user = this;
  const userId = { _id: user._id.toHexString() };
  return jwt.sign(userId, JWT_SECRET, { expiresIn: "1d" });
};

userSchema.methods.userGmailVerify = function () {
  const user = this;
  const userId = { _id: user._id.toHexString() };
  return jwt.sign(userId, JWT_SECRET, { expiresIn: "2d" });
};


export default function userModel (connection: Connection) {
  return connection.model<IUser, UserModel>(DB_SCHEMA_NAME, userSchema);
}
