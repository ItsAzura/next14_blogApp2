'use client';
import React, { useEffect } from 'react';
import styles from './MyBlogDetails.module.css';
import { getBlogById } from '@/actions/blog';
import { useState } from 'react';
import Loading from '@/components/loading/Loading';
import Image from 'next/image';
import { getUserById } from '@/actions/user';
import Link from 'next/link';

const MyBlogDetails = (props) => {
  const { params } = props;
  console.log(params);

  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetails = async () => {
    const res = await getBlogById(params.id);
    if (res.success) {
      setBlog(res.data);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    const res = await getUserById(blog.authorId);
    if (res.success) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  useEffect(() => {
    if (blog) {
      fetchUserDetails(blog.authorId);
    }
  }, [blog]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className={styles.container}>
        <Link href="/MyBlogs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76"
            />
          </svg>
        </Link>
        <div className={styles.author}>
          <h1>{user ? user.username : 'Loading...'}</h1>
          <p>{blog.createdAt.toLocaleDateString()}</p>
        </div>
        <div className={styles.img}>
          <Image src={blog.image} alt="blog image" width={800} height={400} />
        </div>
        <div className={styles.details}>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
        </div>
        <div className={styles.groupBtn}>
          <Link href={`/MyBlogs/EditBlog/${blog._id}`} className={styles.btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
              />
            </svg>
            Edit
          </Link>
          <button className={styles.btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBlogDetails;
