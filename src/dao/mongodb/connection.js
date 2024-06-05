import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://averder:1234@cluster0.6gnudsr.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Cluster0";

export const mongoInit = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log(error);
  }
};
