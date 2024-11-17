import React from "react";
import "../header/header.css";
import './logo-animation.css';
import { NavLink } from "react-router-dom";
import { ButtonLight } from "../button-light/ButtonLight";
import { ButtonDark } from "../button-dark/ButtonDark";
import { isAuthenticated } from "../../api/auth/isAuthenticated";
import { getUserId } from "../../api/auth/getUserId";

export const Header = () => {
    const isUserAuthenticated = isAuthenticated();
    const userId = getUserId();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className="navbar-left">
                    <NavLink to="/" className="main-logo light-green jetbrains-mono logo-animation">
                        {Array.from("Backpal.").map((char, index) => (
                            <span key={index}>{char}</span>
                        ))}
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown-hover d-none d-lg-block">
                            <a className="nav-link-normal dropdown-toggle light-green jetbrains-mono"
                               id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                About Us
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item jetbrains-mono" to="/project-description">Project's description</NavLink>
                                <NavLink className="dropdown-item jetbrains-mono" to="/about-me">About me</NavLink>
                            </div>
                        </li>
                        <li className="nav-item d-lg-none">
                            <NavLink className="nav-link-normal light-green jetbrains-mono" to="/project-description">
                                Project's description
                            </NavLink>
                        </li>
                        <li className="nav-item d-lg-none">
                            <NavLink className="nav-link-normal light-green jetbrains-mono" to="/about-me">
                                About me
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link-normal light-green jetbrains-mono" to="/our-approach">
                                Our approach
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link-normal light-green jetbrains-mono" to="/journeys">
                                Journeys
                            </NavLink>
                        </li>
                    </ul>
                    <div className="header-button-holder ms-auto">
                        {isUserAuthenticated ? (
                            <>
                                <ButtonDark message={"Profile"} path={`/profile/${userId}`} />
                                <ButtonLight message="Logout" path="/logout" onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }} />
                            </>
                        ) : (
                            <>
                                <ButtonDark message={"Login"} path={"/login"} />
                                <ButtonLight message={"Register"} path={"/register"} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
