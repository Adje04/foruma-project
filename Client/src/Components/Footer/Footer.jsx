import React from 'react';
import './Footer.css';
import { Icon } from '@iconify/react/dist/iconify.js';
export default function Footer({ className }) {
    return (
        <footer className={`footer-all ${className}`} >
            <div className="grid-footer">
         
                
                <div className="  footer-menu ">
                    <h3>Menu</h3>
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/bibliothèque">Bibliothèques</a></li>
                        <li><a href="/list-question">Question-Tech</a></li>
                        <li><a href="/communities">Communautés</a></li>
                        <li><a href="/login">Se connecter</a></li>
                        <li><a href="/about">A propos</a></li>
                    </ul>
                </div>


                <div className="footer-contact">

                    <div><h3>Contact</h3></div>
                    <div>

                        <p>
                            <Icon icon="mdi:phone" className="footer-icon" /> Téléphone <br />
                            +228 00 23 456 345
                        </p>
                        <p>
                            <Icon icon="mdi:email" className="footer-icon" /> Email <br />
                            foruma@gmail.com
                        </p>
                    </div>
                    <div className="footer-social">
                        <h3>Social</h3>
                        <a href="#"><Icon icon="mdi:linkedin" className="social-icon" /></a>
                        <a href="#"><Icon icon="mdi:facebook" className="social-icon" /></a>
                        <a href="#"><Icon icon="mdi:xing" className="social-icon" /></a>
                    </div>
                </div>

                {/* Description Section */}
                <div className="footer-description form-grid">
                    <p>
                        Foruma, Lorem ipsum dolor sit amet consectetur. Imperdiet rhoncus tristique et venenatis.
                        Laoreet amet blandit mauris condimentum mattis placerat tellus. Cras egestas iaculis sed magna
                        adipiscing orci euismod sagittisisus. Eget adipiscing at ornare ut.
                    </p>
                </div>


            </div>

            <div className="footer-bottom">
                <p>foruma © 2024 - Powered & designed by adjeeklou22@gmail.com</p>
            </div>
        </footer>
    );
}

























