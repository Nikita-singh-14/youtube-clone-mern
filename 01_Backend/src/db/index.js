import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async () => {
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
      // console connectionInstance we will learn more things
      console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("ERROR:", error);
        process.exit(1)  // read about process.exit()
    }
}

export default connectDB
