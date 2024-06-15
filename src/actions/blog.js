'use server';
import Blog from '@/database/models/blog';
import { connectToDatabase } from '@/database/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { writeFile } from 'fs/promises';

// Hàm tạo blog mới
export const createBlog = async (formData) => {
  // Kết nối tới database
  await connectToDatabase();
  try {
    // Lấy dữ liệu từ form
    const title = formData.get('title');
    const content = formData.get('content');
    const image = formData.get('image');

    // Kiểm tra xem các trường có được nhập đầy đủ không
    if (!title || !content) {
      return {
        success: false,
        error: 'Please enter all fields',
      };
    }

    // Kiểm tra xem người dùng đã upload ảnh chưa
    if (!image || !(image instanceof File)) {
      return {
        success: false,
        error: 'Please upload an image',
      };
    }

    // Chuyển ảnh từ dạng File sang dạng Buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Lưu ảnh vào thư mục public/upload
    const profileImagePath = `D:/Nextjs/next14_blogapp/public/upload/${image.name}`;
    await writeFile(profileImagePath, buffer);

    console.log(`open ${profileImagePath} to see the uploaded files`);

    // Lấy token từ cookie
    const getCookies = cookies();
    const Token = getCookies.get('next14_token')?.value || '';
    if (Token === '') {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // Giải mã token để lấy ra id của người dùng
    const decoded = jwt.verify(Token, process.env.JWT_SECRET);
    console.log(decoded);
    const authorId = decoded.id;

    // Tạo blog mới
    const newBlog = new Blog({
      title,
      content,
      image: `/upload/${image.name}`,
      authorId,
    });

    // Lưu blog vào database
    const savedBlog = await newBlog.save();
    console.log(savedBlog);

    // Trả về thông báo tùy thuộc vào việc blog đã được lưu hay chưa
    if (savedBlog) {
      return {
        success: true,
        message: 'Blog created successfully',
      };
    } else {
      return {
        success: false,
        error: 'Blog not created',
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

// Hàm lấy tất cả blog
export const getAllBlogs = async () => {
  await connectToDatabase();
  try {
    const blogs = await Blog.find();
    return {
      success: true,
      data: blogs,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
