import React from "react";
import "./assets/css/style.scss";
import "./assets/js/main"
import HeaderMegaMenu from "./HeaderMegaMenu";
// import Navbar from "../../UI/Navbar_v2";
import Client from "./Client";
import i from "./assets/img/hero-img.png";
import Features from "./Features";
import { NavLink } from "react-router-dom";
import Pricing from "./Pricing";
import FooterSocial from "./FooterSocial"

export default function Home() {
  return (
    <>
      <HeaderMegaMenu />
      {/* <Navbar /> */}
      <section id="hero" className="d-flex align-items-center">
        {/* navbar , scroll */}
        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-duration="1000">
              <h1>Better Solutions For Your Business</h1>
              <h2>We Provide A Platform for people to form teams and work on various Projects</h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <NavLink to="/signup">
                  <a className="btn-get-started scrollto">Get Started</a>
                </NavLink>
                {/* <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox btn-watch-video"><i className="bi bi-play-circle"></i><span>Watch Video</span></a> */}
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-duration="1000">
              <img src={i} className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>

      </section>
      <Client />
      <Features />
      <div data-aos="zoom-in" data-aos-duration="1000">
        {/* <Pricing /> */}

      </div>
      
        <FooterSocial/>
    </>
  );
}

