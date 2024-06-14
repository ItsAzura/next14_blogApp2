'use server';
import User from '@/database/models/user';
import { connectToDatabase } from '@/database/db';
import bcryptjs from 'bcryptjs';

export const signUpUser = async (formData) => {
  await connectToDatabase();
  try {
    const { username, email, password } = formData;

    const user = await User.findOne({ email });
    if (user) {
      return {
        success: false,
        error: 'User already exists',
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      return {
        success: true,
        message: 'User created successfully',
      };
    } else {
      return {
        success: false,
        error: 'User not created',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
