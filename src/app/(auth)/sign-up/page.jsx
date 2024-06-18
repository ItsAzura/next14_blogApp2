'use client';
import React, { useState } from 'react';
import styles from './SignUp.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { signUpUser } from '@/actions/user';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const router = useRouter();
  //Tạo state formData
  const [formData, setFormData] = useState({
    username: '',
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
    //Gọi hàm signUpUser và truyền formData vào
    const res = await signUpUser(formData);
    console.log(res);
    //Kiểm tra kết quả trả về
    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
    } else {
      toast.error(res.error);
    }
  };

  //Kiểm tra xem form có hợp lệ không
  const isFormValid = formData.username && formData.email && formData.password;
  console.log(formData);
  return (
    <div className={styles.Container}>
      <ToastContainer />
      <div className={styles.Container_Left}>
        <Image src="/sign-up.png" alt="Sign Up" width={600} height={600} />
      </div>
      <div className={styles.Container_Right}>
        <h1>Sign Up</h1>
        <form
          onSubmit={handleSubmit} //Gọi hàm handleSubmit khi submit form
        >
          <div className={styles.input}>
            <p>User Name</p>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username} //Gán giá trị của input vào state formData
              onChange={handleChange} //Gọi hàm handleChange khi thay đổi giá trị của input
            />
          </div>
          <div className={styles.input}>
            <p>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email} //Gán giá trị của input vào state formData
              onChange={handleChange} //Gọi hàm handleChange khi thay đổi giá trị của input
            />
          </div>
          <div className={styles.input}>
            <p>Password</p>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password} //Gán giá trị của input vào state formData
              onChange={handleChange} //Gọi hàm handleChange khi thay đổi giá trị của input
            />
          </div>
          <div className={styles.btn}>
            <button
              type="submit"
              disabled={!isFormValid} //Disable button nếu form không hợp lệ
            >
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
