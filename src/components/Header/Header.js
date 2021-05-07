import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="header-title">IMS</div>
      </Link>
      <div className="header-nav">
        <Link to="/product" style={{ textDecoration: "none" }}>
          <div>Product</div>
        </Link>
        <Link to="/location" style={{ textDecoration: "none" }}>
          <div>Location</div>
        </Link>
        <Link to="/productmovement" style={{ textDecoration: "none" }}>
          <div>Movement</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
