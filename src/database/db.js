import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('Using existing connection');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Blog_App',
    });
    isConnected = true;
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to database');
  }
};
