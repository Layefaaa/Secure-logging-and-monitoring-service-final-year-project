import mongoose from "mongoose";
require("dotenv").config();
const mongo_db_user=process.env.MONGO_DB_USER??''
const mongo_db_password=process.env.MONGO_DB_PASSWORD??''
const MONGO_URI=
// 'mongodb://localhost:27017'
`mongodb+srv://${mongo_db_user}:${mongo_db_password}@cluster0.hf131.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const connection = mongoose.createConnection(
  MONGO_URI,
  );

  connection
    .asPromise()
    .then(() => {
      console.log('MongoDB connection established');
    })
    .catch((err) => {
    console.error('MongoDB connection failed', err.message);
    });
export default connection