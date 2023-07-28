import mongoose from "mongoose";
import log from "./logger";

async function connectDb() {
  const MONGO_URI = process.env.MONGO_URI || "";

  try {
    await mongoose.connect(MONGO_URI);
    log.info("Connected to database");
  } catch (error) {
    process.exit(1);
  }
}

export default connectDb;
