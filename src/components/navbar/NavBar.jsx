'use client';
import React from 'react';
import styles from './NavBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { signOutUser } from '@/actions/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NavBar = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);
  const toggleNavbar = () => {
    setIsHovered(!isHovered);
  };
  const router = useRouter();
  const handleSignOut = async () => {
    await signOutUser();
    router.replace('/sign-in');
  };
  console.log(user);
  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <p>Azura's Blog</p>
      </Link>
      <div className={`${styles.navbarItems} ${isHovered ? styles.show : ''}`}>
        <Link href="/blogs">Blog</Link>
        <Link href="/AddBlog">Create</Link>
        <Link href="/MyBlogs">My Blogs</Link>
        <Link href="/profile">{user?.data?.username}</Link>
        <button onClick={handleSignOut}>Logout</button>
      </div>
      <div className={styles.sideBarIcon} onClick={toggleNavbar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M0 3.75A.75.75 0 0 1 .75 3h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 3.75M0 8a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8m.75 3.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default NavBar;
