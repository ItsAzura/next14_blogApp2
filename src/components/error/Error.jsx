/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './Error.module.css';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className={styles.error_page}>
      <div className={styles.content}>
        <h1 data-text="404">404</h1>
        <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
        <p>
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </p>
        <div className={styles.btns}>
          <Link href="/">return home</Link>
          <Link href="/">report a problem</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
