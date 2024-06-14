'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { AuthUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import { signOutUser } from '@/actions/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/NavBar';

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
    const result = await signOutUser();
    router.replace('/sign-in');
  };

  return (
    <div>
      <Navbar user={user} />
    </div>
  );
}
