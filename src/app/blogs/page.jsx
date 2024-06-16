'use client';
import BlogCard from '@/components/blogCard/BlogCard';
import React from 'react';
import { useState, useEffect } from 'react';
import { getAllBlogs } from '@/actions/blog';
import Loading from '@/components/loading/Loading';
import styles from './Blog.module.css';
import Link from 'next/link';

const Blogs = () => {
  const [path, setPath] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogList = async () => {
    const res = await getAllBlogs();
    if (res.success) {
      setBlogs(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogList();
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  console.log(path);

  return (
    <div className={styles.container}>
      <div className={styles.groupTitle}>
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
        <h1>All Blogs</h1>
      </div>

      <div className={styles.gridList}>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} path={path} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
