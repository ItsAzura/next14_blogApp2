'use client';
import React from 'react';
import styles from './SignIn.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signInUser } from '@/actions/user';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signInUser(formData);
    console.log(res);
    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      toast.error(res.error);
    }
  };

  const isFormValid = formData.email && formData.password;
  console.log(formData);
  return (
    <div className={styles.Container}>
      <ToastContainer />
      <div className={styles.Container_Left}>
        <Image src="/sign-in.png" alt="Sign Up" width={600} height={600} />
      </div>
      <div className={styles.Container_Right}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input}>
            <p>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            <p>Password</p>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.btn}>
            <button type="submit" disabled={!isFormValid}>
              Sign In
            </button>
          </div>
        </form>
        <Link href="/sign-up">Don't have an account? </Link>
      </div>
    </div>
  );
};

export default SignInPage;
