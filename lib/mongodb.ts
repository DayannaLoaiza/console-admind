import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

export async function connecDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}
