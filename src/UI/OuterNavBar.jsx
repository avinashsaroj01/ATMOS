import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./OuterNavBar.module.css";
export default function OuterNavBar() {
    return (
        <>
            <div className="container-fluid nav_bg">
                <div className="row">
                    <div className="col-12 mx-auto">

                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container-fluid">
                                <NavLink className={styles.navbar_brand} to="/">Atmos</NavLink>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <div className="mt-3">
                                                <NavLink exact activeClassName={styles.menu_active} className={styles.nav_link} to="/">Home</NavLink>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="mt-3 ml-2">
                                                <NavLink exact activeClassName={styles.menu_active} className={styles.nav_link} to="/service">Service</NavLink>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="mt-3 ml-2">
                                                <NavLink exact activeClassName={styles.menu_active} className={styles.nav_link} to="/contact">Contact</NavLink>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="mt-3 ml-3">
                                                <NavLink to="/login" className={styles.btn}>Login/Sign Up</NavLink>
                                            </div>
                                        </li>

                                    </ul>

                                </div>
                            </div>
                        </nav>

                    </div>
                </div>
            </div>
        </>
    );
}