import React from 'react';
import './homepage.css';
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { InfoCard } from "../../components/info-card/InfoCard";
import { ButtonDark } from "../../components/button-dark/ButtonDark";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import backgroundImage1 from "../homepage/pattern.svg";
import backgroundImage2 from "../homepage/pattern1.svg";
import backgroundImage3 from "../homepage/pattern2.svg";
import CodeEditor from "../homepage/code-editor.svg";

export const Homepage = () => {


    return (
        <div className="homepage-container">
            <div className="main-content">
                <Parallax className="parallax-container" pages={3.1} >

                    <ParallaxLayer offset={0} speed={0.5}
                                   style={{  zIndex: "-900" }}
                    >
                        <div className="centered-content">
                            <Header />
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={0}
                        speed={0}
                        style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'cover', zIndex: "-1000" }}
                        className="background-container"
                    />

                    <ParallaxLayer offset={0.3} speed={0.5}
                                   style={{  zIndex: "-950" }}
                    >
                        <div className="centered-content">
                            <div className="intro-section">
                                <div className="hero">
                                    <h1 className="clash-font light-green">Did you always want to learn backend development?</h1>
                                    <h2 className="clash-font sicilian-orange">Don’t just learn, practice it with us.</h2>
                                    <p className="jetbrains-mono light-green">
                                        We use our unique journey system, guiding you through the steps necessary to
                                        build a backend service. Learn the theory and practice along the way – with Backpal.
                                    </p>
                                </div>

                                <div className="main-graphic">
                                    <img src={CodeEditor} alt="Code Editor" className="editor-svg" />
                                </div>
                            </div>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={1}
                        speed={0}
                        factor={1.1}
                        style={{ backgroundImage: `url(${backgroundImage2})`, backgroundSize: 'cover' }}
                        className="background-container"
                    />

                    <ParallaxLayer offset={1.25} speed={0.8}>
                        <div className="centered-content">
                            <section className="how-it-works">
                                <h1 className="clash-font light-green">How does it all work?</h1>
                                <div className="section-break"></div>

                                <div className="cards-container">
                                    <InfoCard number={1}
                                              content={"You choose one of our journeys, each designed to assist you in developing a fully functional backend service"} />
                                    <InfoCard number={2}
                                              content={"After reading intro that we provide for each lesson and checking other sources independently you are ready to write code"} />
                                    <InfoCard number={3}
                                              content={"If you think your solution is ready, then you can submit it and our edge cutting system will verify it, and you can go further up your route!"} />
                                </div>
                            </section>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={2.1}
                        speed={0}
                        style={{ backgroundImage: `url(${backgroundImage3})`, backgroundSize: 'cover', zIndex: "-1000" }}
                        className="background-container"
                    />

                    <ParallaxLayer offset={2.5} speed={0.5}>
                        <div className="centered-content">
                            <section className="register-section">
                                <h1 className="clash-font dirty-white">
                                    Ready to start your first backend journey?
                                </h1>
                                <h2 className="jetbrains-mono dirty-white">
                                    No need to look far – the register button is right here.
                                </h2>
                                <div className="section-break"></div>

                                <ButtonDark message={"Register"} path={"register"} />
                            </section>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer offset={2.95} speed={0.5}>
                        <div className="centered-content">
                            <Footer />
                        </div>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>
    );
};
