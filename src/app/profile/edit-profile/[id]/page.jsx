'use client';
import React from 'react';
import styles from './Editprofile.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { updateUser, getUserById } from '@/actions/user';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = (props) => {
  const router = useRouter();
  const { params } = props;
  console.log(params);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUser({
      ...user,
      [name]: value,
      [name]: name === 'avatar' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    if (user.avatar instanceof File) {
      formData.append('avatar', user.avatar);
    }
    formData.append('designation', user.designation);
    formData.append('age', user.age);
    formData.append('location', user.location);
    formData.append('about', user.about);

    console.log([...formData]);

    const res = await updateUser(formData, user._id);
    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        router.push(`/profile`);
      }, 3000);
    } else {
      toast.error(res.error);
    }
  };

  const handelUser = async () => {
    const res = await getUserById(params.id);
    if (res.success) {
      setUser(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    handelUser();
  }, []);

  useEffect(() => {
    if (user) {
      handleSubmit();
    }
  }, [user]);

  console.log(user);

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Link href={`/profile`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
            d="M328 112L184 256l144 144"
          />
        </svg>
      </Link>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          value={user.username}
          name="username"
          id="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={user.email}
          name="email"
          id="email"
          onChange={handleChange}
        />
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleChange}
          accept="image/*"
        />
        <label htmlFor="age">Age</label>
        <input
          type="text"
          value={user.age}
          name="age"
          id="age"
          onChange={handleChange}
        />
        <label htmlFor="designation">Designation</label>
        <input
          type="text"
          value={user.designation}
          name="designation"
          id="designation"
          onChange={handleChange}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          value={user.location}
          name="location"
          id="location"
          onChange={handleChange}
        />
        <label htmlFor="about">About</label>
        <textarea
          type="text"
          value={user.about}
          name="about"
          id="about"
          cols="30"
          rows="10"
          onChange={handleChange}
        />
        <button type="submit" className={styles.btn}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
