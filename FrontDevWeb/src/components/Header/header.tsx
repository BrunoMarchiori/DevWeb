import React from "react";
import logo from "../../assets/react.svg"; // Importando a imagem do logo

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white">
    
        <div style={{ display: "flex", alignItems: "center", padding: "10px", justifyContent: "space-between" }}>
            <div className="d-flex justify-content-start">
                <a className="navbar-brand" href="/">
                <img
                    src={logo}
                    alt="Marketplace Logo"
                    style={{ height: "40px" }}
                />
                </a>
            </div>
            
            <div>
                <form className="d-flex flex-grow-1 mx-3" role="search">
                    <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search products"
                    aria-label="Search"
                    />
                    <button className="btn btn-outline-light" type="submit">
                    Search
                    </button>
                </form>
            </div>
            
            
            <div className="d-flex justify-content-end">
                <button className="btn btn-light me-2">
                <i className="bi bi-cart"></i> Cart
                </button>
                <button className="btn btn-outline-light">Login</button>
            </div>
        </div>
        
          
          
        
    </header>
  );
};

export default Header;
