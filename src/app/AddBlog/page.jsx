'use client';
import React, { useEffect, useState } from 'react';
import styles from './AddBlog.module.css';
import { createBlog } from '@/actions/blog';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlog = () => {
  const router = useRouter();
  // Khởi tạo state formData với các trường title, content, image
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });

  // Hàm xử lý sự kiện thay đổi giá trị của các trường input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  // Hàm xử lý sự kiện submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Tạo một instance của FormData
    const newFormData = new FormData();
    // Thêm các trường title, content, image vào FormData
    newFormData.append('title', formData.title);
    newFormData.append('content', formData.content);
    newFormData.append('image', formData.image);

    // Gọi hàm tạo blog mới từ file actions/blog.js
    const res = await createBlog(newFormData);

    // Hiển thị thông báo
    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push('/blogs');
      }, 3000);
    } else {
      toast.error(res.error);
    }
  };

  console.log(formData);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"
          />
        </svg>
      </Link>
      <h1 className={styles.title}>Add Blog</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          accept="image/*"
        />
        <button className={styles.btn} type="submit">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
