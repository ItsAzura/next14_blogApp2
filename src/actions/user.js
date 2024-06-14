'use server';
import User from '@/database/models/user';
import { connectToDatabase } from '@/database/db';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const signUpUser = async (formData) => {
  await connectToDatabase();
  try {
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      return {
        success: false,
        error: 'Please enter all fields',
      };
    }

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

export const signInUser = async (formData) => {
  await connectToDatabase();
  try {
    const { email, password } = formData;
    if (!email || !password) {
      return {
        success: false,
        error: 'Please enter all fields',
      };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: 'User does not exist',
      };
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return {
        success: false,
        error: 'Invalid password',
      };
    }

    const createTokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const Token = jwt.sign(createTokenData, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const getCookies = cookies();
    getCookies.set('next14_token', Token, {
      httpOnly: true,
    });

    return {
      success: true,
      message: 'User signed in successfully',
      data: JSON.parse(JSON.stringify(user)),
      token: Token,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Something went wrong',
    };
  }
};

export const AuthUser = async () => {
  await connectToDatabase();
  try {
    const getCookies = cookies();
    const Token = getCookies.get('next14_token')?.value || '';
    if (Token === '') {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const decoded = jwt.verify(Token, process.env.JWT_SECRET);

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    } else {
      return {
        success: true,
        message: 'User authenticated',
        data: JSON.parse(JSON.stringify(user)),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Something went wrong',
      message: 'Something went wrong! please try again',
    };
  }
};

export const signOutUser = async () => {
  const getCookies = cookies();
  getCookies.set('next14_token', '');
};
