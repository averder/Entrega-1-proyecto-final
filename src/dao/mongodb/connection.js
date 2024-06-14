import mongoose from "mongoose";
import "dotenv/config";
import { buildConnString } from "../helpers.js";

const MONGO_URL = buildConnString(
  "mongodb+srv",
  process.env.DB_USER,
  process.env.DB_PWD,
  process.env.DB_URL,
  process.env.DB_DBNAME,
  process.env.DB_ARGS
);

const mongoInit = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log(error);
  }
};

export { MONGO_URL, mongoInit };
