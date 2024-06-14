'use client';
import React, { useState } from 'react';
import styles from './SignUp.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { signUpUser } from '@/actions/user';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signUpUser(formData);
    console.log(res);
    if (res.success) {
      alert(res.message);
      router.push('/sign-in');
    } else {
      alert(res.error);
    }
  };

  const isFormValid = formData.username && formData.email && formData.password;
  console.log(formData);
  return (
    <div className={styles.Container}>
      <div className={styles.Container_Left}>
        <Image src="/sign-up.png" alt="Sign Up" width={600} height={600} />
      </div>
      <div className={styles.Container_Right}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input}>
            <p>User Name</p>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
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
              Sign Up
            </button>
          </div>
        </form>
        <Link href="/sign-in">Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
