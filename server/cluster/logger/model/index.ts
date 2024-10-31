import { Connection, Schema } from "mongoose";
import { LoggerModel, UserLogger } from "@/server/cluster/schema.interfaces";

const loggerSchema: Schema<UserLogger> = new Schema({
  email: { type: String, required: true },
  method: {
    type: String,
    enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    required: true,
  },
  endpoint:String,
  payload: { type: Schema.Types.Mixed, required: false },
  type: String,
  status: Number,
  info: {type: Object},
},
{ timestamps: true });

const DB_SCHEMA_NAME = "userLogger";
export default function userLoggerModel(connection: Connection) {
  return connection.model<UserLogger, LoggerModel>(
    DB_SCHEMA_NAME,
    loggerSchema
  );
}
