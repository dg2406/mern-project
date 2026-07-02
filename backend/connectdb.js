import mongoose from "mongoose";

const connectDb = async () => {

  try {

    const conn = await mongoose.connect(
      process.env.MONGO_URL,
      {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
      }
    );

    console.log(
      `Connected to MongoDB: ${conn.connection.host}`
    );

  }
  catch(error){

    console.log(
      "MongoDB connection error:",
      error.message
    );

    process.exit(1);
  }

};

export default connectDb;