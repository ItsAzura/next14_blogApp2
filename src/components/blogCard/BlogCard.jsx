import React from 'react';
import styles from './BlogCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ blog, path }) => {
  return (
    <div>
      <Link href={`${path}/${blog._id}`} className={styles.Card}>
        <Image src={blog.image} alt="blog" width={200} height={200} />
        <h2>{blog.title}</h2>
        <p>{blog.createdAt.toLocaleDateString()}</p>
      </Link>
    </div>
  );
};

export default BlogCard;
