'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { AuthUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import { signOutUser } from '@/actions/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/NavBar';
import Link from 'next/link';
import Footer from '@/components/footer/Footer';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('next14_token');

    if (!token) {
      router.replace('/sign-in');
    }

    const fetchUser = async () => {
      const fetchedUser = await AuthUser();
      console.log(fetchedUser);
      setUser(fetchedUser);
      setIsLogin(true);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    router.replace('/sign-in');
  };

  return (
    <div>
      <Navbar user={user} logout={handleSignOut} />
      <div className={styles.container}>
        <div className={styles.content}>
          <p>Hi, {user?.data?.username}!!!</p>
          <h1>Welcome to Azura's Blog</h1>
          <p>
            This is a simple blog application where you can create, read,
            update, and delete blogs.
          </p>
          <p>You can also view your own blogs and edit them.</p>
          <Link className={styles.btn} href="/blogs">
            Enjoy your stay!
          </Link>
        </div>
        <div className={styles.image}>
          <Image src="/home.png" alt="logo" width={500} height={500} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
