import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [showProduct, setShowProduct] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showMovement, setShowMovement] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="home">
        <Link to="/product" style={{ textDecoration: "none" }}>
          <div className="home-nav">
            <img className="home-nav-icon" src="./images/stand.png" />
            <h4>Product</h4>
            <p>you can view add and edit Products</p>
          </div>
        </Link>
        <Link to="/location" style={{ textDecoration: "none" }}>
          <div className="home-nav">
            <img className="home-nav-icon" src="./images/map.png" />
            <h4>Location</h4>
            <p>you can view add and edit Loactions</p>
          </div>
        </Link>
        <Link to="/productmovement" style={{ textDecoration: "none" }}>
          <div className="home-nav">
            <img className="home-nav-icon" src="./images/collision.png" />
            <h4>Product Movement</h4>
            <p>you can view add and edit Movement</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
