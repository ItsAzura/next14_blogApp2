import React from 'react';
import styles from './SignIn.module.css';
import Image from 'next/image';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Container_Left}>
        <Image src="/sign-in.png" alt="Sign Up" width={600} height={600} />
      </div>
      <div className={styles.Container_Right}>
        <h1>Sign In</h1>
        <form>
          <div className={styles.input}>
            <p>Email</p>
            <input type="email" name="email" id="username" />
          </div>
          <div className={styles.input}>
            <p>Password</p>
            <input type="password" name="password" id="password" />
          </div>
          <div className={styles.btn}>
            <button type="submit">Sign In</button>
          </div>
        </form>
        <Link href="/sign-up">Don't have an account? </Link>
      </div>
    </div>
  );
};

export default SignInPage;
