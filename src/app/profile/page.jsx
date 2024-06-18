'use client';
import React, { useEffect } from 'react';
import styles from './profile.module.css';
import { getDetaislUser } from '@/actions/user';
import { useState } from 'react';
import Loading from '@/components/loading/Loading';
import Image from 'next/image';
import Link from 'next/link';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    const res = await getDetaislUser();
    if (res.success) {
      setUser(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <Link href="/">
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
      <h1>My Profile</h1>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <Image
            src={user.avatar || '/default_avatar.png'}
            alt="avatar"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.profileInfo}>
          <h2>User Name: {user.username}</h2>
          <h3>Email: {user.email}</h3>
          <h3>Age: {user.age}</h3>
          <h3>Designation: {user.designation}</h3>
          <h3>Location: {user.location}</h3>
          <h3>About: </h3>
          <p>{user.about}</p>
          <div className={styles.btn}>
            <Link href={`/profile/edit-profile/${user._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"
                />
              </svg>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
