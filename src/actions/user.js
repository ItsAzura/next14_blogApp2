'use server';
import User from '@/database/models/user';
import { connectToDatabase } from '@/database/db';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { writeFile } from 'fs/promises';

//Hàm Đăng ký user
export const signUpUser = async (formData) => {
  //Kết nối đến database
  await connectToDatabase();
  try {
    //Lấy dữ liệu từ form
    const { username, email, password } = formData;
    //Kiểm tra xem các trường có được nhập đầy đủ không
    if (!username || !email || !password) {
      return {
        success: false,
        error: 'Please enter all fields',
      };
    }

    //Kiểm tra xem user đã tồn tại chưa
    const user = await User.findOne({ email });
    if (user) {
      return {
        success: false,
        error: 'User already exists',
      };
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Tạo mới user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //Lưu user vào database
    const savedUser = await newUser.save();

    //Kiểm tra xem user đã được lưu vào database chưa
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

//Hàm Đăng nhập user
export const signInUser = async (formData) => {
  //Kết nối đến database
  await connectToDatabase();
  try {
    //Lấy dữ liệu từ form
    const { email, password } = formData;
    //Kiểm tra xem các trường có được nhập đầy đủ không
    if (!email || !password) {
      return {
        success: false,
        error: 'Please enter all fields',
      };
    }

    //Kiểm tra xem user có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: 'User does not exist',
      };
    }

    //Kiểm tra xem password có đúng không
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return {
        success: false,
        error: 'Invalid password',
      };
    }

    //Tạo token
    const createTokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const Token = jwt.sign(createTokenData, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    //Lưu token vào cookie
    const getCookies = cookies();
    getCookies.set('next14_token', Token, {
      httpOnly: true,
    });

    //Trả về kết quả
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

//Hàm Lấy thông tin user đã đăng nhập
export const AuthUser = async () => {
  //Kết nối đến database
  await connectToDatabase();
  try {
    //Lấy token từ cookie
    const getCookies = cookies();
    const Token = getCookies.get('next14_token')?.value || '';
    if (Token === '') {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    //Giải mã token
    const decoded = jwt.verify(Token, process.env.JWT_SECRET);

    //Kiểm tra xem user có tồn tại không
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

//Hàm Đăng xuất user
export const signOutUser = async () => {
  //Xóa token khỏi cookie
  const getCookies = cookies();
  getCookies.set('next14_token', '');
};

//Hàm Lấy thông tin user theo id
export const getUserById = async (id) => {
  //Kết nối đến database
  await connectToDatabase();
  try {
    //Kiểm tra xem user có tồn tại không
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

//Hàm lấy thông tin user
export const getDetaislUser = async () => {
  //Kết nối đến database
  await connectToDatabase();
  try {
    //Lấy token từ cookie
    const getCookies = cookies();
    const Token = getCookies.get('next14_token')?.value || '';
    if (Token === '') {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    //Giải mã token
    const decoded = jwt.verify(Token, process.env.JWT_SECRET);

    //Kiểm tra xem user có tồn tại không
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

//Hàm cập nhật thông tin user
export const updateUser = async (formData, id) => {
  //Kết nối đến database
  await connectToDatabase();
  try {
    //Lấy dữ liệu từ form
    const username = formData.get('username');
    const email = formData.get('email');
    const avatar = formData.get('avatar');
    const designation = formData.get('designation');
    const age = formData.get('age');
    const location = formData.get('location');
    const about = formData.get('about');

    //Kiểm tra xem các trường có được nhập đầy đủ không
    if (!username || !email || !designation || !age || !location || !about) {
      return {
        success: false,
        error: 'Please enter all fields',
      };
    }

    //Kiểm tra xem user có tồn tại không
    if (!avatar || !(avatar instanceof File || typeof avatar === 'string')) {
      return {
        success: false,
        error: 'Please upload your Avatar',
      };
    }

    //Lưu avatar vào thư mục upload
    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const profileImagePath = `D:/Nextjs/next14_blogapp/public/upload/${avatar.name}`;
    await writeFile(profileImagePath, buffer);
    console.log(`open ${profileImagePath} to see the uploaded files`);

    //Cập nhật thông tin user
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

    //Kiểm tra xem user đã được cập nhật chưa
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
