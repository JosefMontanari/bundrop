import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <p>
            Please check out our socials, drop a like and a follow to stay
            informed on offers and events
          </p>
          <div className="footer-image-container">
            <img src="/Instagram_icon.png" alt="" className="footer-image" />
            <img src="Facebook_Logo_2023.png" alt="" className="footer-image" />
            <img src="twitter.png" alt="" className="footer-image" />
          </div>
        </div>
        <div className="footer-content-center">
          <ul>
            <a href="#">Home</a>
            <a href="#">Menu</a>
            <a href="#">About Us</a>
            <a href="#">Privacy policy</a>
          </ul>
        </div>
        <div className="footer-content-right">
          <p>contact@bundrop.org</p>
          <p>+46 709 585 787</p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Footer;
