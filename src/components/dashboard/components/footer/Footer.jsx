import React from "react";
import Title from "../../../title/Title.jsx";
import FacebookIcon from "../../../../img/facebook.svg";
import GithubIcon from "../../../../img/github.svg";
import InstagramIcon from "../../../../img/instagram.svg";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <Title className="footerTitle">Todooster</Title>
      <div className="social">
        <a href="http://localhost:3000/main">
          <img src={FacebookIcon} className="socialItem" />
        </a>
        <a href="http://localhost:3000/main">
          <img src={GithubIcon} className="socialItem" />
        </a>
        <a href="http://localhost:3000/main">
          <img src={InstagramIcon} className="socialItem" />
        </a>
      </div>
      <div className="footerText">© 2021 Todooster by andronizer</div>
    </div>
  );
};

export default Footer;
