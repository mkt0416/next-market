
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Success: Connected to MongoDB');
    } catch (err) {
        console.log('Failure: Unconnected to MongoDB', err);
    }
};

export default connectDB;