'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { AuthUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import { signOutUser } from '@/actions/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await AuthUser();
      console.log(fetchedUser);
      setUser(fetchedUser);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    const result = await signOutUser();
    router.replace('/sign-in');
  };

  return (
    <div>
      <h1>Next14 - Authentication</h1>
      <p>{user?.data?.username}</p>
      <p>{user?.data?.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
