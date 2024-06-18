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
  //Tạo state formData
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //Hàm xử lý thay đổi giá trị của input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Hàm xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Gọi hàm signInUser và truyền formData vào
    const res = await signInUser(formData);
    console.log(res);
    //Kiểm tra kết quả trả về
    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      toast.error(res.error);
    }
  };

  //Kiểm tra form có hợp lệ không
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
        <form
          onSubmit={handleSubmit} //Gọi hàm handleSubmit khi submit form
        >
          <div className={styles.input}>
            <p>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email} //Gán giá trị của input vào formData.email
              onChange={handleChange} //Gọi hàm handleChange khi input thay đổi
            />
          </div>
          <div className={styles.input}>
            <p>Password</p>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password} //Gán giá trị của input vào formData.password
              onChange={handleChange} //Gọi hàm handleChange khi input thay đổi
            />
          </div>
          <div className={styles.btn}>
            <button
              type="submit"
              disabled={!isFormValid} //Disable button khi form không hợp lệ
            >
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
