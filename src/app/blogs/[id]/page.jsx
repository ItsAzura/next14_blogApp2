'use client';
import React, { useEffect } from 'react';
import styles from './blogDetails.module.css';
import { getBlogById } from '@/actions/blog';
import { useState } from 'react';
import Loading from '@/components/loading/Loading';
import Image from 'next/image';
import { getUserById } from '@/actions/user';
import Link from 'next/link';

const BlogDetails = (props) => {
  //Lấy params từ props
  const { params } = props;
  console.log(params);

  //Tạo state
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Hàm lấy blog theo id
  const fetchBlogDetails = async () => {
    //Gọi hàm getBlogById và truyền id vào
    const res = await getBlogById(params.id);
    if (res.success) {
      setBlog(res.data);
      setLoading(false);
    }
  };

  //Hàm lấy thông tin user theo id
  const fetchUserDetails = async () => {
    const res = await getUserById(blog.authorId);
    if (res.success) {
      setUser(res.data);
    }
  };

  //Gọi hàm fetchBlogDetails khi component được render
  useEffect(() => {
    fetchBlogDetails();
  }, []);

  //Gọi hàm fetchUserDetails khi blog thay đổi
  useEffect(() => {
    if (blog) {
      fetchUserDetails(blog.authorId);
    }
  }, [blog]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className={styles.container}>
        <Link href="/blogs">
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
      </div>
    </div>
  );
};

export default BlogDetails;
