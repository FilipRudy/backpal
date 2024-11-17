import React from "react";
import "./footer.css";

export const Footer = () => {
    return (
        <footer className="footer-container light-green">
            <div className="footer-content">
                <div className="footer-column">
                    <h4 className="footer-heading">Backpal.</h4>
                </div>
                <div className="footer-column">
                    <h5 className="footer-title">About us</h5>
                    <p className="footer-link">Our mission</p>
                    <p className="footer-link">Company's history</p>
                </div>
                <div className="footer-column">
                    <h5 className="footer-title">Courses</h5>
                    <p className="footer-link">Our approach</p>
                    <p className="footer-link">Courses selection</p>
                </div>
                <div className="footer-column">
                    <h5 className="footer-title">Contact information</h5>
                    <p className="footer-link">Email: filip.rudy5@gmail.com</p>
                </div>
            </div>
        </footer>
    );
};
