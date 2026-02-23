import React from "react";
import styles from "./Logo.module.css";
import LogoImage from "../../assets/logo.svg";

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={LogoImage} alt="Qtify Logo" className={styles.logoIcon} />
    </div>
  );
}

export default Logo;
