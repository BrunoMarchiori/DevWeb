import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {/* Logo alinhada à esquerda */}
          <div className="d-flex justify-content-start">
            <a className="navbar-brand" href="/">
              <img
                src="/logo.png"
                alt="Marketplace Logo"
                style={{ height: "40px" }}
              />
            </a>
          </div>
          {/* Formulário de busca no centro */}
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
          {/* Botões alinhados à direita */}
          <div className="d-flex justify-content-end">
            <button className="btn btn-light me-2">
              <i className="bi bi-cart"></i> Cart
            </button>
            <button className="btn btn-outline-light">Login</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
