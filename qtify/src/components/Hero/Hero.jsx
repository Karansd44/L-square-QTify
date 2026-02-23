import React from "react";
import styles from "./Hero.module.css";
import HeroImage from "../../assets/hero_headphones.svg";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>100 Thousand Songs, ad-free</h1>
          <h1 className={styles.heroTitle}>Over thousands podcast episodes</h1>
        </div>
        <div className={styles.heroImage}>
          <img src={HeroImage} alt="Headphones" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
