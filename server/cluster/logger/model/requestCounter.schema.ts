import { Connection, Schema } from "mongoose";
import { IStatusCodeCounter, RequestModelTy } from "../../schema.interfaces";


const statusCodeCounterSchema :Schema<IStatusCodeCounter> = new Schema({
    endpoint: {
      type: String,
      required: true,
      unique: true
    },
    statusCodes: {
      type: Map,
      of: Number,
      default: {}
    },
    lastReset: {
      type: Date,
      default: Date.now
    }
  }, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }); 
  const DB_SCHEMA_NAME = "requestCounter";
  export default function requestCounterModel (connection: Connection) {
    return connection.model<IStatusCodeCounter, RequestModelTy>(DB_SCHEMA_NAME, statusCodeCounterSchema);
  }
  