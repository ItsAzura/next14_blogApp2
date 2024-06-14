import React from 'react';
import styles from './SignUp.module.css';
import Image from 'next/image';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Container_Left}>
        <Image src="/sign-up.png" alt="Sign Up" width={600} height={600} />
      </div>
      <div className={styles.Container_Right}>
        <h1>Sign Up</h1>
        <form>
          <div className={styles.input}>
            <p>User Name</p>
            <input type="text" name="username" id="username" />
          </div>
          <div className={styles.input}>
            <p>Email</p>
            <input type="email" name="email" id="username" />
          </div>
          <div className={styles.input}>
            <p>Password</p>
            <input type="password" name="password" id="password" />
          </div>
          <div className={styles.btn}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <Link href="/sign-in">Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
