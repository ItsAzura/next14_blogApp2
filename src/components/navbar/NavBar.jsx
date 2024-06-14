import React from 'react';
import styles from './NavBar.module.css';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = ({ user, logout }) => {
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <p>Azura's Blog</p>
      </Link>
      <div className={styles.navbarItems}>
        <Link href="/blogs">Blog</Link>
        <Link href="/blogs/AddBlog">Create</Link>
        <Link href="/blogs/MyBlogs">My Blogs</Link>
        <Link href="/profile">{user?.data?.username}</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
