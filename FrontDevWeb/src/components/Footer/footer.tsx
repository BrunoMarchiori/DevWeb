import React from "react";
import styles from "./footer.module.css"; // Importando o CSS do Footer

const Footer: React.FC = () => {
  return (
    <footer
      className={styles.footer}
    >
      <p>© 2025 Marketplace, All rights reserved.</p>
    </footer>
  );
};

export default Footer;
