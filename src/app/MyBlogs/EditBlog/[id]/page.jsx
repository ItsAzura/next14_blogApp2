'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getBlogById } from '@/actions/blog';
import Loading from '@/components/loading/Loading';
import styles from './EditBlog.module.css';
import Link from 'next/link';
import { updateBlog } from '@/actions/blog';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSingleBlog = (props) => {
  const router = useRouter();
  const { params } = props;
  console.log(params);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBlog({
      ...blog,
      [name]: value,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const handelBlog = async () => {
    const res = await getBlogById(params.id);
    if (res.success) {
      setBlog(res.data);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('content', blog.content);
    if (blog.image instanceof File) {
      formData.append('image', blog.image);
    }

    const response = await updateBlog(formData, blog._id);

    if (response.success) {
      toast.success(response.message);
      router.push(`/MyBlogs/${params.id}`);
    } else {
      toast.error(response.error);
    }
  };

  useEffect(() => {
    handelBlog();
  }, []);

  useEffect(() => {
    if (blog) {
      handleSubmit();
    }
  }, [blog]);

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Link href={`/MyBlogs/${params.id}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
            d="M328 112L184 256l144 144"
          />
        </svg>
      </Link>
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={blog.title}
          name="title"
          id="title"
          onChange={handleChange}
        />
        <label htmlFor="content">Content</label>
        <textarea
          type="text"
          value={blog.content}
          name="content"
          id="content"
          cols="30"
          rows="10"
          onChange={handleChange}
        />
        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" onChange={handleChange} />
        <button type="submit" className={styles.btn}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditSingleBlog;
