/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './Notfound.module.css';
import Link from 'next/link';

const Notfound = () => {
  return (
    <div>
      <div>
        <div className={styles.starsec}></div>
        <div className={styles.starthird}></div>
        <div className={styles.starfourth}></div>
        <div className={styles.starfifth}></div>
      </div>

      <div className={styles.lamp__wrap}>
        <div className={styles.lamp}>
          <div className={styles.cable}></div>
          <div className={styles.cover}></div>
          <div className={styles.in_cover}>
            <div className={styles.bulb}></div>
          </div>
          <div className={styles.light}></div>
        </div>
      </div>

      <section className={styles.error}>
        <div className={styles.error__content}>
          <div className={`${styles.error__message} ${styles.message}`}>
            <h1 className={styles.message__title}>Page Not Found</h1>
            <p className={styles.message__text}>
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists. Please
              try again, or take a look at our.
            </p>
          </div>
          <div className={`${styles.error__nav} ${styles.e_nav}`}>
            <Link href="/" className={styles.e_nav__link}>
              Go back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notfound;
