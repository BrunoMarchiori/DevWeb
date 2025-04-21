import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#343a40",
        color: "#fff",
        padding: "10px",
        textAlign: "center",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <p>© 2025 Marketplace, All rights reserved.</p>
    </footer>
  );
};

export default Footer;
