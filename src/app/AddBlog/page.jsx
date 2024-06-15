'use client';
import React, { useState } from 'react';
import styles from './AddBlog.module.css';
import { createBlog } from '@/actions/blog';
import { useRouter } from 'next/navigation';

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
    const response = await createBlog(newFormData);

    // Hiển thị thông báo
    if (response.success) {
      alert(response.message);
      router.push('/blogs'); // Chuyển hướng về trang blogs
    } else {
      alert(response.error);
    }
  };

  console.log(formData);

  return (
    <div className={styles.container}>
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
