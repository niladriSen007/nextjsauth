import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("Connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (error) => {
      console.log("Error connecting to MongoDB", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
