'use server';
import User from '@/database/models/user';
import { connectToDatabase } from '@/database/db';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { writeFile } from 'fs/promises';

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

export const getUserById = async (id) => {
  await connectToDatabase();
  try {
    const user = await User.findById({ _id: id });
    if (user) {
      return {
        success: true,
        data: user,
      };
    } else {
      return {
        success: false,
        error: 'User not found',
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

export const getDetaislUser = async () => {
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
        data: JSON.parse(JSON.stringify(user)),
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

export const updateUser = async (formData, id) => {
  await connectToDatabase();
  try {
    const username = formData.get('username');
    const email = formData.get('email');
    const avatar = formData.get('avatar');
    const designation = formData.get('designation');
    const age = formData.get('age');
    const location = formData.get('location');
    const about = formData.get('about');

    if (!username || !email || !designation || !age || !location || !about) {
      return {
        success: false,
        error: 'Please enter all fields',
      };
    }

    if (!avatar || !(avatar instanceof File || typeof avatar === 'string')) {
      return {
        success: false,
        error: 'Please upload your Avatar',
      };
    }

    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const profileImagePath = `D:/Nextjs/next14_blogapp/public/upload/${avatar.name}`;
    await writeFile(profileImagePath, buffer);
    console.log(`open ${profileImagePath} to see the uploaded files`);

    const updateBlog = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        username,
        email,
        avatar: `/upload/${avatar.name}`,
        designation,
        age,
        location,
        about,
      },
      {
        new: true,
      }
    );

    if (updateBlog) {
      return {
        success: true,
        message: 'Blog updated successfully',
      };
    } else {
      return {
        success: false,
        error: 'Blog not updated',
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
