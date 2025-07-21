import React, { useEffect, useState } from "react";
import logo from "../../assets/bazaar.png"; // Importando a imagem do logo
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {

    const [userId, setUserId] = useState<number | null>(null);
      
    useEffect(() => {
          const storedUserId = localStorage.getItem('userId');
          if (storedUserId) {
              setUserId(parseInt(storedUserId, 10));
          }
      }, []);

  const navigate = useNavigate();

  const handleClickLogin = () => {
    
    if(userId) {
      localStorage.removeItem('userId');
      setUserId(null);
      window.location.reload(); // Recarrega a página para refletir o logout
      navigate('/'); // Redireciona para a página inicial após o logout
    }
    else {
      navigate(`/login`);
      
    }
    
    
     
  };

  return (
    <header className="bg-primary text-white">
      <div className={styles.header}>
        <div className="d-flex justify-content-start">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Marketplace Logo" style={{ height: "40px" }} />
          </a>
        </div>

        <div className={styles.formDiv}>
          <form className={styles.form} role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Pesquisar produtos"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Pesquisar
            </button>
          </form>
        </div>

        <div className={styles.buttonDiv}>
          <button className="btn btn-light me-2" onClick={() => navigate(`/carrinho`)}>
            <i className="bi bi-cart-check"></i> Carrinho
          </button>
          <button className="btn btn-outline-light" onClick={handleClickLogin}>{userId ? 'Logout' : 'Login'}</button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
